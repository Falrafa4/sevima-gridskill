"""initial schema with users, profiles, roadmaps, and project_tasks

Revision ID: 0001_initial_schema
Revises:
Create Date: 2026-09-26 10:30:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
from sqlalchemy.engine.reflection import Inspector

revision: str = "0001_initial_schema"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    bind = op.get_bind()
    inspector = Inspector.from_engine(bind)
    existing_tables = inspector.get_table_names()

    # 1. Create table users if not already existing
    if "users" not in existing_tables:
        op.create_table(
            "users",
            sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
            sa.Column("email", sa.String(length=255), nullable=False),
            sa.Column("hashed_password", sa.String(length=255), nullable=False),
            sa.Column("full_name", sa.String(length=100), nullable=False),
            sa.Column("avatar_url", sa.String(length=500), nullable=True),
            sa.Column("role", sa.Enum("user", "admin", name="user_role", native_enum=False, length=20), nullable=False, server_default="user"),
            sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.text("true")),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
            sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        )
        op.create_index(op.f("ix_users_email"), "users", ["email"], unique=True)
        op.create_index(op.f("ix_users_id"), "users", ["id"], unique=False)

    # 2. Create table profiles if not already existing
    if "profiles" not in existing_tables:
        op.create_table(
            "profiles",
            sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
            sa.Column("user_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=True),
            sa.Column("student_name", sa.String(length=100), nullable=False),
            sa.Column("vocational_major", sa.String(length=100), nullable=False),
            sa.Column("current_skills", postgresql.JSONB(), server_default="[]", nullable=True),
            sa.Column("target_industry", sa.String(length=100), nullable=False),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        )

    # 3. Create table roadmaps if not already existing
    if "roadmaps" not in existing_tables:
        op.create_table(
            "roadmaps",
            sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
            sa.Column("profile_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False),
            sa.Column("title", sa.String(length=150), nullable=False),
            sa.Column("analysis_summary", sa.Text(), nullable=False),
            sa.Column("skill_gap_summary", postgresql.JSONB(), server_default="[]", nullable=True),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        )

    # 4. Create table project_tasks if not already existing
    if "project_tasks" not in existing_tables:
        op.create_table(
            "project_tasks",
            sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
            sa.Column("roadmap_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("roadmaps.id", ondelete="CASCADE"), nullable=False),
            sa.Column("title", sa.String(length=150), nullable=False),
            sa.Column("description", sa.Text(), nullable=False),
            sa.Column("project_category", sa.String(length=50), nullable=False),
            sa.Column("estimated_hours", sa.Integer(), server_default="2", nullable=False),
            sa.Column("is_completed", sa.Boolean(), server_default=sa.text("false"), nullable=False),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        )


def downgrade() -> None:
    op.drop_table("project_tasks")
    op.drop_table("roadmaps")
    op.drop_table("profiles")
    op.drop_index(op.f("ix_users_id"), table_name="users")
    op.drop_index(op.f("ix_users_email"), table_name="users")
    op.drop_table("users")
