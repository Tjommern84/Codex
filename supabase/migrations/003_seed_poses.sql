-- 003_seed_poses.sql
-- 34 yin yoga poses – Grilley-metoden
-- muscle_groups og meridians er nå text[] arrays

-- SEAT (13 posisjoner)
INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('skosnor', 'Skosnor', 'Shoelace', 'SEAT', 'Shoelace', 'Stretch – gluteus, dype hofterotatorer', ARRAY['Gluteus','Hofterotatorer'], ARRAY['Galleblære'], ARRAY['Lever'], 'Høy', 5, 180, 300, 'Ekstern rotasjon + adduksjon hoften. Tensjon i gluteus, kompresjon lysken.', 1);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('halv_skosnor', 'Halv skosnor', 'Half Shoelace', 'SEAT', 'Shoelace', 'Stretch – gluteus (ensidig)', ARRAY['Gluteus'], ARRAY['Galleblære'], ARRAY['Lever'], 'Medium', 3, 180, 300, 'Mildere versjon, godt startpunkt', 2);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('sovende_svane', 'Sovende svane', 'Sleeping Swan', 'SEAT', 'Shoelace', 'Stretch – gluteus, piriformis', ARRAY['Gluteus','Piriformis'], ARRAY['Galleblære'], ARRAY['Lever'], 'Høy', 5, 180, 300, 'Yin-versjon av due-pose', 3);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('sal', 'Sal', 'Saddle', 'SEAT', 'Saddle', 'Stretch – quad, hoftebøyere, ryggekstensjon', ARRAY['Quadriceps','Hoftebøyere'], ARRAY['Milt/mage'], ARRAY['Blære/nyre'], 'Høy', 5, 180, 300, 'Intern rotasjon hoften mulig, ryggliggende versjon = supta virasana', 4);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('halv_sal', 'Halv sal', 'Half Saddle', 'SEAT', 'Saddle', 'Stretch – quad/hoftebøyer (ensidig)', ARRAY['Quadriceps','Hoftebøyere'], ARRAY['Milt/mage'], ARRAY['Blære/nyre'], 'Medium', 3, 180, 300, 'God introduksjon til full sal', 5);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('drage', 'Drage', 'Dragon', 'SEAT', 'Saddle', 'Stretch – hoftebøyer (psoas, iliacus)', ARRAY['Hoftebøyere','Psoas'], ARRAY['Milt/mage'], ARRAY['Blære/nyre'], 'Medium-Høy', 4, 120, 300, 'Utfall-posisjon, fremre kne over ankel', 6);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('sommerfugl', 'Sommerfugl', 'Butterfly', 'SEAT', 'Caterpillar', 'Stretch – hamstrings, adductorer, ryggen', ARRAY['Hamstrings','Adductorer'], ARRAY['Nyre/blære'], ARRAY['Milt/mage'], 'Medium', 3, 180, 300, 'Mild fleksjon ryggrad + ekstern rot. hoften', 7);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('halv_sommerfugl', 'Halv sommerfugl', 'Half Butterfly', 'SEAT', 'Caterpillar', 'Stretch – hamstrings (ensidig)', ARRAY['Hamstrings'], ARRAY['Nyre/blære'], ARRAY['Milt/mage'], 'Medium', 3, 180, 300, 'Ligner Janu Sirsasana, godt for stive hamstrings', 8);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('oyenstikker', 'Øyenstikker', 'Dragonfly', 'SEAT', 'Dragonfly', 'Stretch – adductorer, groin', ARRAY['Adductorer'], ARRAY['Lever'], ARRAY['Milt/mage','Galleblære'], 'Høy', 5, 180, 300, 'Bred bein-separasjon, kompresjon lyske', 9);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('frosk', 'Frosk', 'Frog', 'SEAT', 'Dragonfly', 'Stretch – adductorer, groin (dypere)', ARRAY['Adductorer'], ARRAY['Lever'], ARRAY['Milt/mage'], 'Maks', 6, 120, 300, 'Krevende, bruk puter under knær', 10);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('halv_frosk', 'Halv frosk', 'Half Frog', 'SEAT', 'Dragonfly', 'Stretch – adductor ensidig + quad', ARRAY['Adductorer','Quadriceps'], ARRAY['Lever','Milt'], ARRAY['Milt/mage'], 'Medium-Høy', 4, 180, 300, 'Ettben-variant, quad-tøy mulig', 11);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('hest', 'Hest', 'Horse', 'SEAT', 'Dragonfly', 'Stretch – adductorer, squat-mobilitet', ARRAY['Adductorer'], ARRAY['Lever'], ARRAY['Milt/mage'], 'Høy', 5, 120, 180, 'Stå, bruk blokker under hæler om nødvendig', 12);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('seiza', 'Seiza', 'Seiza', 'SEAT', 'Saddle', 'Ankelmobilitet, mild quad-tøy', ARRAY['Hoftebøyere','Ankler'], ARRAY['Milt/mage'], ARRAY['Blære'], 'Lav-Medium', 2, 120, 180, 'Tradisjonell japansk sitteposisjon', 13);

-- SPINE (11 posisjoner)
INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('larve', 'Larve', 'Caterpillar', 'SPINE', 'Caterpillar', 'Stretch – hamstrings, thoracolumbar fascia', ARRAY['Hamstrings','Thoracolumbar'], ARRAY['Nyre/blære'], ARRAY['Milt/mage'], 'Medium', 3, 180, 300, 'Full forover-bøy sittende, slapp ryggrad', 14);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('sfinks', 'Sfinks', 'Sphinx', 'SPINE', 'Saddle', 'Ryggekstensjon (mild), mage-åpning', ARRAY['Thoracolumbar'], ARRAY['Milt/mage','Nyre'], ARRAY['Nyre/blære'], 'Lav', 1, 180, 300, 'God innledning til rygg-bøy, albuer under skuldrene', 15);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('sel', 'Sel', 'Seal', 'SPINE', 'Saddle', 'Ryggekstensjon (dyp)', ARRAY['Thoracolumbar'], ARRAY['Milt/mage','Nyre'], ARRAY['Nyre/blære'], 'Høy', 5, 180, 300, 'Armer strekkes, mye kompresjon lumbar', 16);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('kamel', 'Kamel', 'Camel', 'SPINE', 'Saddle', 'Ryggekstensjon + hoftebøyer stretch', ARRAY['Hoftebøyere','Thoracolumbar'], ARRAY['Milt/mage'], ARRAY['Blære/nyre'], 'Høy', 5, 60, 180, 'Mer yang enn yin, korte holds', 17);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('snegl', 'Snegl', 'Snail', 'SPINE', 'Caterpillar', 'Fleksjon hele ryggraden, hamstrings', ARRAY['Thoracolumbar','Hamstrings'], ARRAY['Blære'], ARRAY['Milt/mage'], 'Høy', 5, 180, 300, 'Inversjon-kvalitet, unngå ved nakkeskader', 18);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('vridde_roter', 'Vridde røtter', 'Twisted Roots', 'SPINE', 'Twists', 'Rotasjon thorax + lumbar', ARRAY['Obliques','Thoracolumbar'], ARRAY['Galleblære'], ARRAY['Lever'], 'Lav-Medium', 2, 180, 300, 'Liggende vrid, god rebound-pose', 19);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('kattesvans', 'Kattesvans', 'Cat''s Tail', 'SPINE', 'Twists', 'Lateral fleksjon + rotasjon', ARRAY['Obliques','QL'], ARRAY['Galleblære'], ARRAY['Lever'], 'Medium', 3, 180, 300, 'Liggende sidevri', 20);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('bananastilling', 'Bananastilling', 'Bananasana', 'SPINE', 'Twists', 'Lateral fleksjon hele kroppen', ARRAY['QL','Obliques','IT-band'], ARRAY['Galleblære'], ARRAY['Lever'], 'Medium', 3, 180, 300, 'Liggende banan-form, mild men effektiv', 21);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('ponton', 'Ponton', 'Pontoon', 'SPINE', 'Saddle', 'Mild ryggekstensjon + hoftebøyer', ARRAY['Hoftebøyere'], ARRAY['Milt/mage'], ARRAY['Nyre/blære'], 'Lav-Medium', 2, 180, 300, NULL, 22);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('knebøy', 'Knebøy', 'Squat', 'SPINE', 'Caterpillar', 'Hoftemobilitet, ankelmobilitet', ARRAY['Adductorer','Hoftebøyere'], ARRAY['Nyre'], ARRAY['Blære'], 'Medium', 3, 120, 180, 'Malasana, dypt hofteåpnende', 23);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('elefant', 'Elefant', 'Elephant', 'SPINE', 'Caterpillar', 'Skuldertøy + hamstrings', ARRAY['Hamstrings','Scapular'], ARRAY['Blære'], ARRAY['Milt'], 'Medium', 3, 180, 300, NULL, 24);

-- WINGS (5 posisjoner)
INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('apne_vinger', 'Åpne vinger', 'Open Wings', 'WINGS', 'Wings', 'Skulder + brystkasse-åpning', ARRAY['Scapular'], ARRAY['Hjerte','Lunge'], ARRAY['Tykktarm','Tynntarm'], 'Medium', 3, 180, 300, 'Liggende, armer ut til siden', 25);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('kryssede_vinger', 'Kryssede vinger', 'Crossed Wings', 'WINGS', 'Wings', 'Skulder + øvre rygg', ARRAY['Scapular'], ARRAY['Hjerte','Lunge'], ARRAY['Tykktarm'], 'Medium', 3, 180, 300, NULL, 26);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('smeltende_hjerte', 'Smeltende hjerte', 'Melting Heart', 'WINGS', 'Wings', 'Skulder + thorax-ekst., heart opening', ARRAY['Scapular','Thoracolumbar'], ARRAY['Hjerte','Lunge'], ARRAY['Milt/mage'], 'Medium-Høy', 4, 180, 300, 'Knelen, bryst mot gulvet, hofter over knær', 27);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('hjerteopning', 'Hjerteåpning', 'Heart Opening', 'WINGS', 'Wings', 'Thorax-ekst., mellomgulv-tøy', ARRAY['Thoracolumbar','Scapular'], ARRAY['Hjerte'], ARRAY['Nyre'], 'Medium', 3, 180, 300, 'Liggende, god mot hodepine og tett bryst', 28);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('rullende_panda', 'Rullende panda', 'Rolling Panda', 'WINGS', 'Wings', 'Skulder-mobilitet, sidestrekk', ARRAY['Scapular'], ARRAY['Hjerte','Lunge'], ARRAY['Tykktarm'], 'Lav', 1, 120, 180, NULL, 29);

-- REBOUND (5 posisjoner)
INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('konstruktiv_hvile', 'Konstruktiv hvile', 'Constructive Rest', 'REBOUND', 'Rebound', 'Nervesystem-reset, rygg-hvile', ARRAY['Rygg'], ARRAY[]::text[], ARRAY[]::text[], 'Lav', 1, 120, 300, 'Grunnleggende rebound, parasympatisk aktivering', 30);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('barneposen', 'Barneposen', 'Child''s Pose', 'REBOUND', 'Rebound', 'Rygg-hvile, fordøyelses-stimulering', ARRAY['Thoracolumbar'], ARRAY['Blære'], ARRAY['Milt/mage'], 'Lav', 1, 120, 300, 'Komprimerer magen, rolig avslutning', 31);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('liggende_sete', 'Liggende sete', 'Reclining Seat', 'REBOUND', 'Rebound', 'Hoftehvile, nøytral stilling', ARRAY['Hofter'], ARRAY[]::text[], ARRAY[]::text[], 'Lav', 1, 120, 180, NULL, 32);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('stjerne_ser_paa_himmelen', 'Stjerne ser på himmelen', 'Star Looking at Sky', 'REBOUND', 'Rebound', 'Ryggliggende hvile + brystexpansjon', ARRAY['Rygg'], ARRAY[]::text[], ARRAY[]::text[], 'Lav', 1, 120, 180, NULL, 33);

INSERT INTO poses (slug, name_no, name_en, category, archetype, function_desc, muscle_groups, meridian_tension, meridian_compress, intensity_label, intensity_level, duration_min_sec, duration_max_sec, notes, sort_order)
VALUES ('savasana', 'Savasana', 'Shavasana', 'REBOUND', 'Rebound', 'Full hvile, integrering', ARRAY['Hele kroppen'], ARRAY[]::text[], ARRAY[]::text[], 'Lav', 1, 300, 900, 'Alltid avslutning av praksis', 34);
