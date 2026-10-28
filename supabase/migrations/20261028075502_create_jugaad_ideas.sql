/*
# Create jugaad_ideas table (single-tenant, no auth)

1. New Tables
- `jugaad_ideas`
  - `id` (uuid, primary key)
  - `name` (text, not null) — farmer's name
  - `region` (text, not null) — farmer's location
  - `crop` (text, not null) — crop tag
  - `emoji` (text, not null) — crop emoji
  - `image_url` (text, not null) — farm/field photo URL
  - `desc_en` (text, not null) — idea description in English
  - `desc_hi` (text, not null) — idea description in Hindi
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `jugaad_ideas`.
- Grant CRUD to `anon` + `authenticated` so the anon-key frontend can read/write.
- Allow anon + authenticated full CRUD because the data is intentionally shared/public (community wisdom hub).

3. Seed data
- Inserts the four example farmer ideas (Ramesh/Jhansi, Sunita/Punjab, Arjun/Udaipur, Kamla/Nashik).
*/

CREATE TABLE IF NOT EXISTS jugaad_ideas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  region text NOT NULL,
  crop text NOT NULL,
  emoji text NOT NULL DEFAULT '🌾',
  image_url text NOT NULL,
  desc_en text NOT NULL,
  desc_hi text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE jugaad_ideas ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON jugaad_ideas TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_jugaad" ON jugaad_ideas;
CREATE POLICY "anon_select_jugaad" ON jugaad_ideas FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_jugaad" ON jugaad_ideas;
CREATE POLICY "anon_insert_jugaad" ON jugaad_ideas FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_jugaad" ON jugaad_ideas;
CREATE POLICY "anon_update_jugaad" ON jugaad_ideas FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_jugaad" ON jugaad_ideas;
CREATE POLICY "anon_delete_jugaad" ON jugaad_ideas FOR DELETE
  TO anon, authenticated USING (true);

INSERT INTO jugaad_ideas (name, region, crop, emoji, image_url, desc_en, desc_hi) VALUES
(
  'Ramesh', 'Jhansi', 'Rice', '🌾',
  'https://images.pexels.com/photos/13888402/pexels-photo-13888402.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Made a drip irrigation system using old plastic bottles! Works great with less water.',
  'प्लास्टिक की पुरानी बोतलों से बनाया ड्रिप इरिगेशन सिस्टम! कम पानी में बढ़िया काम।'
),
(
  'Sunita', 'Punjab', 'Tomato', '🍅',
  'https://images.pexels.com/photos/3173586/pexels-photo-3173586.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Natural pesticide made by mixing neem leaves and buttermilk. Pests disappear instantly.',
  'नीम की पत्तियों और छाछ को मिलाकर बनाया प्राकृतिक कीटनाशक। कीड़े तुरंत गायब।'
),
(
  'Arjun', 'Udaipur', 'Eggplant', '🍆',
  'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Used broken earthen pots as slow-release water reservoirs near roots. Saves water in dry months.',
  'टूटे मिट्टी के बर्तनों को जड़ के पास धीमे-पानी वाले जलाशय के रूप में इस्तेमाल किया। सूखे महीनों में पानी बचता है।'
),
(
  'Kamla', 'Nashik', 'Grapes', '🍇',
  'https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Hung old CDs on threads to scare birds away from ripening grapes — no harm, no cost.',
  'पुरानी सीडी को धागे से लटकाकर पकते अंगूरों से पक्षियों को भगाया — नुकसान नहीं, खर्च नहीं।'
)
ON CONFLICT DO NOTHING;
