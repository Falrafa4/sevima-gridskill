import sys
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.database.database import SessionLocal
from app.core.security import get_password_hash
from app.models.user import User
from app.models.enums import UserRole
from app.models.profile import Profile
from app.models.roadmap import Roadmap
from app.models.task import ProjectTask


def seed_data():
    db: Session = SessionLocal()
    try:
        print("🌱 Memulai proses seeding data GridSkill...")

        # 1. Seed Admin User
        admin_email = "admin@gridskill.id"
        stmt_admin = select(User).where(User.email == admin_email)
        existing_admin = db.execute(stmt_admin).scalars().first()
        if not existing_admin:
            admin_user = User(
                email=admin_email,
                hashed_password=get_password_hash("adminpassword123"),
                full_name="Administrator GridSkill",
                role=UserRole.ADMIN,
                is_active=True,
            )
            db.add(admin_user)
            db.flush()
            print(f"  ✅ Admin user dibuat: {admin_email} (password: adminpassword123)")
        else:
            print(f"  ℹ️  Admin user sudah ada: {admin_email}")

        # 2. Seed Demo Student User
        student_email = "siswa@gridskill.id"
        stmt_student = select(User).where(User.email == student_email)
        student_user = db.execute(stmt_student).scalars().first()
        if not student_user:
            student_user = User(
                email=student_email,
                hashed_password=get_password_hash("siswapassword123"),
                full_name="Rizky Ramadhan",
                role=UserRole.USER,
                is_active=True,
            )
            db.add(student_user)
            db.flush()
            print(f"  ✅ Demo student user dibuat: {student_email} (password: siswapassword123)")
        else:
            print(f"  ℹ️  Demo student user sudah ada: {student_email}")

        # 3. Seed Profile for Demo Student (One-to-One)
        stmt_profile = select(Profile).where(Profile.user_id == student_user.id)
        existing_profile = db.execute(stmt_profile).scalars().first()
        if not existing_profile:
            profile = Profile(
                user_id=student_user.id,
                student_name="Rizky Ramadhan",
                vocational_major="SIJA",
                current_skills=["Networking", "Basic Linux", "IoT Arduino"],
                target_industry="Smart Energy & Green Data Center",
            )
            db.add(profile)
            db.flush()
            print(f"  ✅ Profil siswa vokasi dibuat untuk: {student_user.full_name} ({profile.vocational_major})")

            # 4. Seed Roadmap (Aksi AI 1)
            roadmap = Roadmap(
                profile_id=profile.id,
                title="Roadmap Akselerasi SIJA Menuju Green Data Center & Smart Grid",
                analysis_summary=(
                    "Siswa memiliki fondasi dasar jaringan dan kontrol mikro kontroller. "
                    "Namun kurikulum normatif sekolah belum mengajarkan protokol telemetri industri real-time "
                    "serta optimalisasi rasio efisiensi energi fasilitas server."
                ),
                skill_gap_summary=[
                    "Protokol Telemetri Industri (MQTT & Modbus TCP)",
                    "Monitoring & Observabilitas Beban Daya Data Center",
                    "Kalkulasi & Audit Rasio Power Usage Effectiveness (PUE)",
                ],
            )
            db.add(roadmap)
            db.flush()
            print(f"  ✅ Roadmap belajar dibuat: {roadmap.title}")

            # 5. Seed Project Tasks (Aksi AI 2)
            tasks = [
                ProjectTask(
                    roadmap_id=roadmap.id,
                    title="Simulasi Protokol Telemetri MQTT pada Edge Gateway",
                    description=(
                        "Rakit skrip simulator IoT untuk membaca parameter arus dan tegangan beban "
                        "lalu kirimkan secara publish periodik ke broker MQTT Mosquitto."
                    ),
                    project_category="Software",
                    estimated_hours=3,
                    is_completed=True,
                ),
                ProjectTask(
                    roadmap_id=roadmap.id,
                    title="Perancangan Dashboard Telemetri Beban Daya Mikrogrid",
                    description=(
                        "Bangun dashboard visualisasi real-time berbasis web untuk memetakan "
                        "fluktuasi konsumsi listrik puncak dan mendeteksi anomali pemborosan daya."
                    ),
                    project_category="Software",
                    estimated_hours=4,
                    is_completed=False,
                ),
                ProjectTask(
                    roadmap_id=roadmap.id,
                    title="Audit Rasio PUE & Otomasi Pendinginan Server",
                    description=(
                        "Hitung rasio Power Usage Effectiveness (PUE) dari data historis beban "
                        "dan susun logika kendali otomatis untuk pendingin ruangan berbasis suhu ambien."
                    ),
                    project_category="Optimization",
                    estimated_hours=2,
                    is_completed=False,
                ),
            ]
            db.add_all(tasks)
            print(f"  ✅ {len(tasks)} modul proyek nyata berhasil diinjeksi ke project_tasks")
        else:
            print(f"  ℹ️  Profil dan roadmap siswa sudah tersedia.")

        db.commit()
        print("🌿 Seeding data GridSkill berhasil diselesaikan!\n")
    except Exception as e:
        db.rollback()
        print(f"❌ Terjadi kesalahan saat seeding: {e}")
        sys.exit(1)
    finally:
        db.close()


if __name__ == "__main__":
    seed_data()
