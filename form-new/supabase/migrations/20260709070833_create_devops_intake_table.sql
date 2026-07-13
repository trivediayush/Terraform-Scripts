/*
# Create devops_intake table for DevOps client onboarding submissions

1. New Tables
- `devops_intake`
  - `id` (uuid, primary key)
  - `client_type` (text) — "Company" or "Individual"
  - `project_name` (text, not null)
  - `owner_name` (text, not null)
  - `email` (text, not null)
  - `repo_url` (text)
  - `main_branch` (text)
  - `cloud_provider` (text)
  - `traffic_profile` (text) — used when provider is "Unsure"
  - `domain_name` (text)
  - `domain_status` (text)
  - `stack` (jsonb) — selected stack buttons (Node.js, Python, Go, PHP, etc.)
  - `stack_details` (text) — per-stack versioning/package manager details
  - `lifecycle_services` (jsonb) — array of selected DevOps lifecycle services
  - `database_info` (text)
  - `config_files` (text)
  - `build_instructions` (text)
  - `access_control` (text)
  - `retention_policy` (text)
  - `remarks` (text)
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `devops_intake`.
- This is a no-auth public onboarding form (single-tenant, no sign-in screen).
- Allow anon + authenticated INSERT so the public form can submit.
- No SELECT/UPDATE/DELETE for anon — submissions are write-only from the public form
  to prevent anyone from reading other clients' intake data.

3. Important Notes
- The form is a public onboarding portal; anyone can submit but nobody can read
  back submissions through the anon key. Data is managed via the Supabase dashboard
  or authenticated admin queries.
- jsonb columns store arrays/objects for flexible multi-select fields.
*/

CREATE TABLE IF NOT EXISTS devops_intake (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_type text NOT NULL DEFAULT 'Company',
  project_name text NOT NULL,
  owner_name text NOT NULL,
  email text NOT NULL,
  repo_url text,
  main_branch text,
  cloud_provider text,
  traffic_profile text,
  domain_name text,
  domain_status text,
  stack jsonb DEFAULT '[]'::jsonb,
  stack_details text,
  lifecycle_services jsonb DEFAULT '[]'::jsonb,
  database_info text,
  config_files text,
  build_instructions text,
  access_control text,
  retention_policy text,
  remarks text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE devops_intake ENABLE ROW LEVEL SECURITY;

-- INSERT only for anon + authenticated (public form can submit, cannot read)
DROP POLICY IF EXISTS "anon_insert_intake" ON devops_intake;
CREATE POLICY "anon_insert_intake" ON devops_intake FOR INSERT
  TO anon, authenticated WITH CHECK (true);
