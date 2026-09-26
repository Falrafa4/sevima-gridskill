import json
import logging
import re
from typing import List
from app.core.config import settings
from app.schemas.agent import AgentOutputSchema, TaskItem, PathwayRequest

logger = logging.getLogger(__name__)

JSON_SCHEMA_HINT = """Kembalikan HANYA objek JSON valid dengan struktur persis seperti ini (tanpa markdown backticks, tanpa teks tambahan):
{
  "roadmap_title": "string",
  "analysis_summary": "string",
  "skill_gaps": ["string", "string", "string"],
  "tasks": [
    {
      "title": "string",
      "description": "string",
      "project_category": "Hardware | Software | Optimization",
      "estimated_hours": 2
    }
  ]
}"""


class GeminiPathwayAgent:
    """Autonomous AI Agent using Google Gemini to analyze vocational student skill gaps

    and generate adaptive hands-on project micro-curriculums.
    """

    @classmethod
    def _build_system_prompt(cls) -> str:
        return (
            "Anda adalah AI Career & Vocational Learning Navigator handal untuk siswa SMK rumpun teknologi di Indonesia (SDG 4). "
            "Tugas Anda adalah menutup jurang kesenjangan keterampilan (Skill Mismatch) antara kurikulum normatif sekolah "
            "dengan kebutuhan industri modern yang berkelanjutan (Smart Grid, Green Data Center, IoT, Cloud, Renewable Energy Tech).\n\n"
            "Pedoman Analisis:\n"
            "1. Evaluasi keahlian saat ini siswa berdasarkan jurusannya dan target industri masa depannya.\n"
            "2. Identifikasi 2-4 jurang kesenjangan kompetensi spesifik (skill gaps).\n"
            "3. Rancang 3 hingga 5 modul tugas proyek praktis (hands-on project tasks) yang terstruktur dan terukur. "
            "Kategori proyek wajib salah satu dari: 'Hardware', 'Software', atau 'Optimization'.\n"
            "4. Berikan estimasi waktu pengerjaan proyek yang masuk akal (2 - 8 jam per tugas).\n\n"
            f"{JSON_SCHEMA_HINT}"
        )

    @classmethod
    def _build_user_prompt(cls, request: PathwayRequest) -> str:
        skills_str = ", ".join(request.current_skills) if request.current_skills else "Dasar komputer / normatif"
        return (
            f"Data Siswa Vokasi:\n"
            f"- Nama Siswa: {request.student_name}\n"
            f"- Jurusan SMK: {request.vocational_major}\n"
            f"- Keahlian Saat Ini: {skills_str}\n"
            f"- Target Industri Masa Depan: {request.target_industry}\n\n"
            f"Hasilkan roadmap belajar adaptif dan daftar tugas proyek berbasis proyek nyata (Project-Based Learning) "
            f"untuk mengantar siswa ini siap terjun ke industri {request.target_industry}."
        )

    @classmethod
    def _candidate_models(cls) -> List[str]:
        fallbacks = [m.strip() for m in settings.GEMINI_MODEL_FALLBACKS.split(",") if m.strip()]
        return list(dict.fromkeys([settings.GEMINI_MODEL, *fallbacks]))

    @classmethod
    def _extract_json(cls, raw_text: str) -> dict:
        cleaned = re.sub(r"^```(?:json)?|```$", "", raw_text.strip(), flags=re.MULTILINE).strip()
        return json.loads(cleaned)

    @classmethod
    async def _call_model(cls, client, model: str, request: PathwayRequest) -> AgentOutputSchema:
        from google.genai import types

        response = await client.aio.models.generate_content(
            model=model,
            contents=[cls._build_system_prompt(), cls._build_user_prompt(request)],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                temperature=0.4,
                automatic_function_calling=types.AutomaticFunctionCallingConfig(disable=True),
            ),
        )
        raw_text = (response.text or "").strip()
        if not raw_text:
            raise ValueError(f"empty response body from model {model}")
        return AgentOutputSchema.model_validate(cls._extract_json(raw_text))

    @classmethod
    async def generate_pathway_plan(cls, request: PathwayRequest) -> AgentOutputSchema:
        """Call Google Gemini asynchronously with structured JSON output.

        Falls back to the next candidate model on 404/API errors, then to a
        deterministic vocational-major plan if every model and the network fail.
        """
        if settings.GEMINI_API_KEY:
            try:
                from google import genai

                client = genai.Client(api_key=settings.GEMINI_API_KEY)
            except Exception as exc:
                logger.warning("Gemini client init failed (%s). Using deterministic fallback.", exc)
                return cls._generate_fallback_plan(request)

            for model in cls._candidate_models():
                try:
                    plan = await cls._call_model(client, model, request)
                except Exception as exc:
                    logger.warning("Gemini model %s failed (%s). Trying next candidate.", model, exc)
                    continue
                logger.info("Gemini plan generated with model %s.", model)
                return plan

            logger.error("All Gemini candidate models failed. Using deterministic fallback.")

        return cls._generate_fallback_plan(request)

    @classmethod
    def _generate_fallback_plan(cls, request: PathwayRequest) -> AgentOutputSchema:
        """Deterministic fallback when GEMINI_API_KEY is not configured or network quota exhausted."""
        major = request.vocational_major.upper()
        target = request.target_industry

        if "SIJA" in major or "TKJ" in major:
            return AgentOutputSchema(
                roadmap_title=f"Akselerasi {request.vocational_major} Menuju {target}",
                analysis_summary=(
                    f"Siswa memiliki pemahaman dasar sistem jaringan dan infrastruktur ({', '.join(request.current_skills)}). "
                    f"Namun untuk masuk ke industri {target}, dibutuhkan penguasaan protokol industri real-time "
                    f"dan monitoring efisiensi telemetri energi."
                ),
                skill_gaps=[
                    "Protokol Telemetri Industri (MQTT & Modbus TCP)",
                    "Monitoring & Observabilitas Infrastruktur Berkelanjutan",
                    "Edge Computing & Keamanan Jaringan Data Center",
                ],
                tasks=[
                    TaskItem(
                        title="Simulasi Protokol Telemetri MQTT pada Edge Gateway",
                        description=(
                            "Konfigurasikan broker MQTT lokal (Mosquitto) dan buat script simulasi pengiriman data beban listrik "
                            "tiap sensor secara periodik."
                        ),
                        project_category="Software",
                        estimated_hours=3,
                    ),
                    TaskItem(
                        title="Perancangan Sistem Monitoring Energi Mikrogrid (Dashboard)",
                        description=(
                            "Bangun dashboard telemetri berbasis web/Grafana sederhana untuk memvisualisasikan "
                            "konsumsi daya puncak dan mendeteksi anomali pemborosan daya."
                        ),
                        project_category="Software",
                        estimated_hours=4,
                    ),
                    TaskItem(
                        title="Audit & Optimasi Efisiensi Daya Jalur Server (PUE)",
                        description=(
                            "Lakukan kalkulasi rasio Power Usage Effectiveness (PUE) berdasarkan log daya beban server "
                            "dan rumuskan rekomendasi pendinginan cerdas."
                        ),
                        project_category="Optimization",
                        estimated_hours=2,
                    ),
                ],
            )

        # Default fallback for other majors (RPL, Elektro, Mekatronika)
        return AgentOutputSchema(
            roadmap_title=f"Transformasi Kompetensi Terapan {request.vocational_major} ke {target}",
            analysis_summary=(
                f"Siswa memiliki modal keahlian teknis ({', '.join(request.current_skills)}). "
                f"Kesenjangan utama terletak pada integrasi standar industri {target}, automasi cerdas, "
                f"dan standarisasi dokumentasi proyek portofolio."
            ),
            skill_gaps=[
                "Implementasi Standar Industri Terapan Masa Kini",
                "Automasi & Monitoring Berkelanjutan (Green Tech)",
                "Penyusunan Dokumentasi & Pengujian Proyek Terstandar",
            ],
            tasks=[
                TaskItem(
                    title="Pembuatan Modul Logika Kontrol & Telemetri Terapan",
                    description=(
                        "Kembangkan modul controller atau script automasi yang membaca parameter lingkungan kerja "
                        "dan mengontrol aktuator secara adaptif."
                    ),
                    project_category="Hardware" if "ELEKTRO" in major or "MEKATRONIKA" in major else "Software",
                    estimated_hours=4,
                ),
                TaskItem(
                    title="Integrasi API Telemetri & Basis Data Terdistribusi",
                    description=(
                        "Hubungkan komponen kontrol ke basis data cloud terpusat untuk pencatatan historis dan peringatan dini."
                    ),
                    project_category="Software",
                    estimated_hours=3,
                ),
                TaskItem(
                    title="Optimasi Efisiensi Beban & Pengujian Keandalan",
                    description=(
                        "Uji performa modul di bawah beban kerja bertahap dan catat parameter efisiensi energi yang diperoleh."
                    ),
                    project_category="Optimization",
                    estimated_hours=2,
                ),
            ],
        )
