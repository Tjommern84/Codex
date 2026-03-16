-- 004_seed_variants.sql
-- Kanoniske varianter med steg-for-steg instruksjoner for alle 34 poser

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'skosnor_v1', 'Skosnor', 'Shoelace', true,
  ARRAY[
    'Sitt med korslagte ben og legg ett kne direkte over det andre – knærne skal ligge nesten oppå hverandre.',
    'Plasser hendene foran deg og bøy deg rolig fremover. La ryggen runde naturlig fra korsryggen og oppover.',
    'Hodet henger tungt. Slipp nakken fullstendig.',
    'Hold vekten jevnt i sittebenene – ikke len deg fremover i knærne.'
  ],
  'Sitt på en brettet teppe eller pute for å løfte hoften om korsryggen er stiv. Prøv en sidestrekk eller vri i stedet for å bøye rett frem.',
  'Unngå ved akutte kneskader. Dersom det kjennes i knærne og ikke hoften – sitt høyere eller bytt til halv skosnor.',
  1
FROM poses WHERE slug = 'skosnor';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'halv_skosnor_v1', 'Halv skosnor', 'Half Shoelace', true,
  ARRAY[
    'Sitt med ett ben rett frem og det andre brettet inn på utsiden av det strake benet.',
    'Bøy deg rolig fremover langs det strake benet. La ryggen runde og hodet henge.',
    'Grip om ankelen eller foten – bruk grepet som et ankerfeste for å fordype strekket.',
    'Husk å bytte side.'
  ],
  'Bøy gjerne kneet på det strake benet litt i starten. Bruk en remme rundt foten dersom du ikke når frem.',
  'Unngå om du har isjias – løft hoften med en pute slik at knærne er under hoftnivå.',
  2
FROM poses WHERE slug = 'halv_skosnor';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'sovende_svane_v1', 'Sovende svane', 'Sleeping Swan', true,
  ARRAY[
    'Fra knestående, skyv ett kne frem mellom hendene og ut mot siden. Det fremre kneet peker ut, foten peker mot den andre hoften.',
    'La det bakre benet gli rett bakover og senk hoften mot gulvet.',
    'Bøy overkroppen fremover og hvil pannen på gulvet, en bolster eller underarmene.',
    'Pust rolig og la tyngden synke ned i hoften for hvert utpust.'
  ],
  'Legg en foldet teppe under det fremre setet om hoften henger i luften. Jo mer foten er trukket inn mot hoften, jo mildere – skyv den frem for mer intensitet.',
  'Unngå ved akutte problemer i SI-leddet. Smerter i kneet – trekk foten nærmere hoften.',
  3
FROM poses WHERE slug = 'sovende_svane';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'sal_v1', 'Sal', 'Saddle', true,
  ARRAY[
    'Sett deg mellom eller på hælene med knærne samlet eller litt fra hverandre.',
    'Plasser hendene bak deg på gulvet og len deg forsiktig bakover. Stopp der du kjenner strekket.',
    'Gå videre til albuene om det er mulig, og til slutt legg ryggen flat på gulvet.',
    'La korsryggen bue og magen løfte seg. Pust dypt ned i magen.',
    'For å komme ut: rull til én side og rett ut bena ett om gangen.'
  ],
  'Legg en bolster eller brettet teppe under ryggen for støtte. Spre knærne litt for å redusere trykket.',
  'Ta hensyn til kne- og ankelsmerter – ikke forsér. Unngå om du har akutt korsryggproblematikk.',
  4
FROM poses WHERE slug = 'sal';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'halv_sal_v1', 'Halv sal', 'Half Saddle', true,
  ARRAY[
    'Sitt med ett ben bøyd inn slik at foten er ved siden av hoften, det andre benet strekkes rett frem.',
    'Plasser hendene bak deg og len deg rolig bakover over det bøyde benet.',
    'Stopp der du kjenner strekket i låret eller hoftebøyeren. Kom ut ved å rulle til siden.'
  ],
  'God introduksjon til full sal. Legg en pute under det bøyde kneet om det er ubehagelig.',
  'Ubehag i kneet – sjekk at foten er ved siden av hoften, ikke under. Ikke forsér.',
  5
FROM poses WHERE slug = 'halv_sal';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'drage_v1', 'Drage', 'Dragon', true,
  ARRAY[
    'Fra knestående eller nedoverhund, ta ett langt skritt frem mellom hendene.',
    'Kne rett over hæl på det fremre benet. Skyv det bakre kneet bakover til du kjenner strekket foran i hoften.',
    'Hold hendene på gulvet på begge sider av foten, eller legg dem på det fremre låret for å løfte overkroppen.',
    'Sink hoften rolig ned for hvert utpust. Bytt side.'
  ],
  'Legg en teppe under det bakre kneet. Dragon Flying High: løft hendene til låret og åpne brystet. Dragon Flying Low: gå ned på albuene innenfor foten.',
  'Ubehag i knekoppen – legg teppe under eller løft bakbenet ved å tukke tærne under.',
  6
FROM poses WHERE slug = 'drage';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'sommerfugl_v1', 'Sommerfugl', 'Butterfly', true,
  ARRAY[
    'Sitt med fotsålene mot hverandre. Skyv føttene litt fremover fra deg – ikke trekk dem inn mot lysken.',
    'La ryggen runde seg naturlig og bøy rolig fremover. Hodet henger tungt ned mot hælene.',
    'Legg hendene lett på føttene eller på gulvet foran deg. Slipp alt muskulært hold.'
  ],
  'Sett deg på en pute om korsryggen er stiv. Jo nærmere føttene er mot lysken, jo mer indre lår. Jo lenger frem – jo mer hamstrings og rygg.',
  'Unngå om du har isjias. Behold rett rygg om du har korsryggplager der fleksjon ikke er anbefalt.',
  7
FROM poses WHERE slug = 'sommerfugl';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'halv_sommerfugl_v1', 'Halv sommerfugl', 'Half Butterfly', true,
  ARRAY[
    'Sitt med ett ben rett frem. Brett det andre inn mot lysken.',
    'La haken falle mot brystet, bøy deg fremover langs det strake benet.',
    'Grip foten eller ankelen – bruk grepet som et ankerfeste. La ryggen runde fra korsryggen.'
  ],
  'Bøy kneet på det strake benet litt om hamstrings er stive. Bruk en remme rundt foten.',
  'Unngå om du har isjias – løft setet med en pute.',
  8
FROM poses WHERE slug = 'halv_sommerfugl';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'oyenstikker_v1', 'Øyenstikker', 'Dragonfly', true,
  ARRAY[
    'Sitt med bena bredt utstrakt til sidene – så langt de vil uten at du anstrenger deg.',
    'Lean rolig fremover og støtt deg på hendene eller albuene. La ryggen runde naturlig.',
    'Bøy gjerne over ett bein om gangen for variasjon. Strekket er dypt – gi deg god tid.'
  ],
  'Sitt på en pute for å vinkle hoften fremover. Øyenstikker kan ta lang tid å åpne – ikke forvent rask fremgang.',
  'Unngå om du har isjias. Ubehag innerst i kneet – trekk bena litt nærmere hverandre.',
  9
FROM poses WHERE slug = 'oyenstikker';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'frosk_v1', 'Frosk', 'Frog', true,
  ARRAY[
    'Kom ned på alle fire. Skyv knærne bredt ut til sidene langs med matten.',
    'Sett under- og overben i 90 graders vinkel. Fotsålene peker opp eller ut.',
    'Senk hoften mot gulvet og støtt deg på underarmene. Slipp alt hold i lysken.',
    'Bruk puter under knærne om det er ubehagelig.'
  ],
  'Halvfrosk: hold bena samlet og løft hoften til nivå med knærne for mildere versjon. Forfrosk: lie med magen på gulvet, armer strukket frem.',
  'En av de krevende posene. Stans om du kjenner sterk smerte i lysken. Ikke anbefalt for nybegynnere uten oppvarming.',
  10
FROM poses WHERE slug = 'frosk';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'halv_frosk_v1', 'Halv frosk', 'Half Frog', true,
  ARRAY[
    'Ligg på siden med det nedre benet strakt.',
    'Bøy det øvre benet fremover og la det hvile mot gulvet.',
    'Strekker adductorer ensidig – mildere variant av frosk. Bytt side.'
  ],
  'Støtt det øvre kneet med en pute om hoften er stiv.',
  NULL,
  11
FROM poses WHERE slug = 'halv_frosk';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'hest_v1', 'Hest', 'Horse', true,
  ARRAY[
    'Stå med bena bredt fra hverandre – litt bredere enn skulderbredde. Tær peker ut til sidene.',
    'Senk hoften ned i en dyp bred knebøy. Hendene i bønn foran brystet, albuene mot innsiden av knærne.',
    'Bruk blokker under hælene om de ikke når gulvet.'
  ],
  'Tilsvarende Malasana – squatposisjon. Hold i bolster eller stol foran deg for støtte i starten.',
  'Ubehag i knær: spre føttene bredere eller hev hælene. Unngå om du har akutte kneskader.',
  12
FROM poses WHERE slug = 'hest';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'seiza_v1', 'Seiza', 'Seiza', true,
  ARRAY[
    'Kneel med bena samlet. Senk setet ned mot hælene – sett deg tilbake på dem.',
    'La hendene hvile avslappet i fanget. Hold ryggen lett oppreist.',
    'Bruk en pute, teppe eller seiza-benk under setet for å avlaste knærne og anklene.'
  ],
  'Tradisjonell japansk sittestilling. Svært fleksible kan sitte mellom føttene i stedet for på dem.',
  'Ubehag bak i knærne – legg en rullet teppe i knekket. Stans om det er skarp smerte i knærne.',
  13
FROM poses WHERE slug = 'seiza';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'larve_v1', 'Larve', 'Caterpillar', true,
  ARRAY[
    'Sitt med begge bena strakt frem, hip-bredde fra hverandre.',
    'La haken falle mot brystet. Bøy rolig fremover og grip om ankler, legg eller føtter.',
    'La ryggen runde helt naturlig – fra korsryggen og opp til nakken. Slipp alle muskler.',
    'Kjenn strekket flytte seg oppover ryggsøylen ettersom du synker dypere.'
  ],
  'Bøy knærne litt i starten om hamstrings er stive. Bruk en remme rundt føttene. Sett deg på en pute for å vinkle hoften fremover.',
  'Unngå om du har korsryggplager der fleksjon er kontraindisert.',
  14
FROM poses WHERE slug = 'larve';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'sfinks_v1', 'Sfinks', 'Sphinx', true,
  ARRAY[
    'Ligg på magen. Plasser albuene rett under skuldrene, underarmene parallelle.',
    'Løft brystet rolig og la korsryggen bue. Slipp skuldrene ned fra ørene.',
    'Finn kanten der du kjenner et behagelig trykk i korsryggen – ikke skyv lenger.',
    'Pust dypt ned i magen og la korsryggen synke ved hvert utpust.'
  ],
  'Skyv albuene lenger frem for å redusere trykket. Legg en pute under albuene for støtte. God innledning til sel.',
  'Skarp smerte i korsryggen – kom deg ut og hvil på magen. Unngå ved hodepine.',
  15
FROM poses WHERE slug = 'sfinks';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'sel_v1', 'Sel', 'Seal', true,
  ARRAY[
    'Fra sfinks, flytt hendene fremover og strekk armene rett ut. La hendene rotere litt utover.',
    'Press brystet opp og la korsryggen bue dypere. Tyngdekraften gjør arbeidet.',
    'Om det kjennes godt: la hodet falle bakover og åpne halsen.',
    'Kom ut: senk brystet rolig til gulvet, snu hodet til siden og hvil kinnet mot hendene.'
  ],
  'Begynn med korte holds på ett minutt, hvil, gjenta. Spre bena for mer trykk i korsryggen – saml dem for jevnere fordeling.',
  'Sterk smerte i korsryggen – kom ut øyeblikkelig. Unngå ved svangerskap og hodepine.',
  16
FROM poses WHERE slug = 'sel';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'kamel_v1', 'Kamel', 'Camel', true,
  ARRAY[
    'Kneel med hoftebredde mellom knærne, tærne peker rett bakover.',
    'Plasser hendene på korsryggen med fingrene pekende ned. Løft brystet opp og bakover.',
    'For mer dybde: nå bak og ta tak i hælene ett om gangen.',
    'Hold brystet åpent og unngå å kollapse i korsryggen – tenk løft fremover og opp.'
  ],
  'Mer yang enn yin – kortere holds. Tukk tærne under og stå på ballene av føttene om hælene er for langt unna.',
  'Unngå ved korsrygg- eller nakkeskader. Slutt om du blir svimmel.',
  17
FROM poses WHERE slug = 'kamel';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'snegl_v1', 'Snegl', 'Snail', true,
  ARRAY[
    'Ligg på ryggen. Støtt hoften med hendene og rull bena langsomt over hodet.',
    'La ryggen runde fullstendig – dette er ikke plogen (halasana). La knærne bøye om nødvendig.',
    'Tyngden hviler på skuldrene, ikke på nakken. Juster hendene for balanse.',
    'For å komme ut: hold hoften med hendene og rull sakte ned. Hvil flatt noen pust etterpå.'
  ],
  'Erstatt med larve om du ikke ønsker inversjon. La knærne synke mot gulvet for den dypeste ryggrunding.',
  'Unngå ved nakkeskader, høyt blodtrykk, glaukom, svangerskap og menstruasjon. Forbered nakken med fremoverbøy.',
  18
FROM poses WHERE slug = 'snegl';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'vridde_roter_v1', 'Vridde røtter', 'Twisted Roots', true,
  ARRAY[
    'Ligg på ryggen med bøyde knær. Åpne armene ut til sidene som vinger.',
    'Kryss bena som i ørneposisjon og la dem falle til én side mot gulvet.',
    'Snu hodet rolig til den andre siden for et fullstendig vrid gjennom hele kroppen.',
    'La tyngdekraften gjøre arbeidet – ikke press. Bytt side.'
  ],
  'Retning og høyde på knærne endrer hvor i ryggen du kjenner vriden. Høyere knær: øvre rygg. Lavere knær: lumbar.',
  'Prikking i armene – trekk armen ned mot kroppen. Skulderproblemer – støtt armen med en pute.',
  19
FROM poses WHERE slug = 'vridde_roter';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'kattesvans_v1', 'Kattesvans', 'Cat''s Tail', true,
  ARRAY[
    'Ligg på siden, støtt deg på den nedre albuen. Det nedre benet er strakt.',
    'Bøy det nedre benet og nå bak med den øvre hånden for å ta tak i foten.',
    'Trekk foten forsiktig bort fra deg og la ryggen bue lett bakover.',
    'Legg det øvre benet fremover på gulvet. Kjenn strekket i låret og korsryggen.'
  ],
  'Legg deg flat ned for en dypere variant som kombinerer vri og ryggebøy. Kan holdes kort (1 min) som motpose til forover-bøyer.',
  'Unngå om du har akutte korsryggproblemer.',
  20
FROM poses WHERE slug = 'kattesvans';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'bananastilling_v1', 'Bananastilling', 'Bananasana', true,
  ARRAY[
    'Ligg flatt på ryggen med bena samlet og strakt.',
    'Hold setet plant på gulvet – flytt både føtter og overkropp til samme side. Lag en bananform.',
    'Rekk armene over hodet og kryss anklene for ekstra strekk i siden.',
    'Pust rolig, la siden åpne seg for hvert utpust. Bytt side.'
  ],
  'Kryss den ytre ankelen over den indre for mer strekk. Støtt armene med en bolster om du kjenner prikking i hendene.',
  'Unngå dype lateralbøy ved korsryggplager.',
  21
FROM poses WHERE slug = 'bananastilling';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'ponton_v1', 'Ponton', 'Pontoon', true,
  ARRAY[
    'Ligg på siden med bena lett bøyde, kroppen avslappet og lang.',
    'Slipp alt muskulært hold. La gulvet bære deg fullstendig.',
    'En mild hvilende overgangsposisjon mellom aktive poser.'
  ],
  'Legg en pute under hodet for komfort.',
  NULL,
  22
FROM poses WHERE slug = 'ponton';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'knebøy_v1', 'Knebøy', 'Squat', true,
  ARRAY[
    'Stå med bena litt bredere enn hip-bredde. Tærne peker litt utover.',
    'Senk deg ned i dyp knebøy. Hendene i bønn foran brystet, albuene presser lett mot knærne innenfra.',
    'Tyngden fordeles jevnt mellom tær og hæler. La korsryggen synke og hoften åpne seg.'
  ],
  'Legg en brettet teppe under hælene om de ikke når gulvet. Snu og gå fra Dangling til Squat og tilbake flere ganger for å varme opp.',
  'Ubehag i knærne – spre bena bredere. Unngå ved akutte kneskader.',
  23
FROM poses WHERE slug = 'knebøy';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'elefant_v1', 'Elefant', 'Elephant', true,
  ARRAY[
    'Stå med bena hip-bredde fra hverandre, knærne lett bøyde.',
    'Bøy fremover og kryss armene – grip om motsatt albue. La overkroppen henge tung.',
    'Slipp nakken og hodet fullstendig. Svai gjerne fra side til side.'
  ],
  'Bøy knærne mer for å slippe ryggen og styrke låret. Strekk bena for mer hamstrings-strekk.',
  'Unngå ved høyt blodtrykk, glaukom eller svimmelhet. Kom opp sakte.',
  24
FROM poses WHERE slug = 'elefant';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'apne_vinger_v1', 'Åpne vinger', 'Open Wings', true,
  ARRAY[
    'Ligg på ryggen. Strekk armene ut til sidene i en T-form.',
    'La brystkassen åpne seg og skuldrene synke tunge mot gulvet.',
    'Pust dypt ned i brystet. Slipp forsiden av kroppen med hvert utpust.'
  ],
  'Juster armvinkelen – høyere over hodet for skulder, lavere for bryst.',
  NULL,
  25
FROM poses WHERE slug = 'apne_vinger';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'kryssede_vinger_v1', 'Kryssede vinger', 'Crossed Wings', true,
  ARRAY[
    'Ligg på ryggen. Strekk én arm rett ut til siden. Kryss den andre armen over brystet.',
    'Rull forsiktig over på den utstrakte armsiden og la skulderen synke mot gulvet.',
    'La tyngden åpne skulderleddet gradvis. Bytt side.'
  ],
  'Bruk en lett pute under hodet for komfort.',
  'Prikking i armen – juster posisjonen. Unngå ved rotator cuff-skader.',
  26
FROM poses WHERE slug = 'kryssede_vinger';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'smeltende_hjerte_v1', 'Smeltende hjerte', 'Melting Heart', true,
  ARRAY[
    'Fra knestående på alle fire, gå hendene fremover langs matten.',
    'La brystet synke mot gulvet. Hoften holdes rett over knærne – ikke la setet synke bakover.',
    'Pannen eller haken hviler på gulvet eller en bolster. Skuldrene smelter ned.',
    'Pust rolig og la brystet tunge seg lenger ned for hvert utpust.'
  ],
  'Legg en pute under brystet for støtte. Prøv med én arm strukket frem om skuldrene er stive. Legg teppe under knærne.',
  'Prikking i hender eller fingre – juster armposisjon. Unngå ved nakkeskader.',
  27
FROM poses WHERE slug = 'smeltende_hjerte';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'hjerteopning_v1', 'Hjerteåpning', 'Heart Opening', true,
  ARRAY[
    'Ligg på ryggen med en rullet teppe eller bolster plassert under skuldrene, på tvers av matten.',
    'La brystet falle åpent mot taket. Hodet hviler på gulvet – slipp nakken.',
    'Armene hviler avslappet ved sidene med håndflatene opp.',
    'Pust dypt ned i brystet og la brystkassen utvide seg.'
  ],
  'Juster tykkelsen på teppet etter behov. Legg en pute under hodet om nakken føles spent.',
  'Unngå ved akutte ryggrad- eller nakkeskader.',
  28
FROM poses WHERE slug = 'hjerteopning';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'rullende_panda_v1', 'Rullende panda', 'Rolling Panda', true,
  ARRAY[
    'Ligg på ryggen. Strekk én arm rett ut til siden i 90 grader fra kroppen.',
    'Rull sakte over på den siden og la tyngden åpne skulderleddet gradvis.',
    'La kroppen bli tung – skulderen smelter mot gulvet. Bytt side.'
  ],
  'Prøv forskjellige armvinkler – litt over eller under 90 grader – for å treffe ulike deler av skulderen.',
  'Prikking i armen – juster posisjonen umiddelbart.',
  29
FROM poses WHERE slug = 'rullende_panda';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'konstruktiv_hvile_v1', 'Konstruktiv hvile', 'Constructive Rest', true,
  ARRAY[
    'Ligg på ryggen med bøyde knær og føtter flat på gulvet, hip-bredde fra hverandre.',
    'Armene hviler avslappet ved siden av kroppen med håndflatene opp eller ned.',
    'Korsryggen finner sin naturlige kurve. Lukk øynene og pust rolig.',
    'Aktiver ingenting – la nervesystemet finne ro.'
  ],
  'En av de mest terapeutiske stillingene for korsryggen. Kan holdes lenge. God mellom intense poser.',
  NULL,
  30
FROM poses WHERE slug = 'konstruktiv_hvile';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'barneposen_v1', 'Barneposen', 'Child''s Pose', true,
  ARRAY[
    'Kneel og la setet synke tilbake mot hælene.',
    'Brett overkroppen fremover og hvil pannen på gulvet eller en bolster.',
    'Armene enten strekkes fremover for et aktivt strekk, eller hviler langs kroppen.',
    'Pust rolig ned i magen og la korsryggen synke med hvert utpust.'
  ],
  'Spre knærne litt for å gi magen plass. Legg en teppe mellom sete og hæler om hoften ikke når ned. Bruk en bolster under brystet.',
  NULL,
  31
FROM poses WHERE slug = 'barneposen';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'liggende_sete_v1', 'Liggende sete', 'Reclining Seat', true,
  ARRAY[
    'Ligg på ryggen med bøyde knær og føtter flat på gulvet.',
    'En nøytral hvilestilling for hoften mellom aktive poser.',
    'Pust rolig. La kroppen integrere det foregående arbeidet.'
  ],
  'Legg en pute under hodet for komfort.',
  NULL,
  32
FROM poses WHERE slug = 'liggende_sete';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'stjerne_v1', 'Stjerne ser på himmelen', 'Star Looking at Sky', true,
  ARRAY[
    'Ligg flatt på ryggen med bena litt spredt fra hverandre.',
    'Strekk armene litt ut til sidene – håndflatene peker opp.',
    'Slipp all spenning fra kroppen. Integreringsstilling mellom intense seksjoner.'
  ],
  'La kroppen ligge i den posisjonen som føles mest naturlig.',
  NULL,
  33
FROM poses WHERE slug = 'stjerne_ser_paa_himmelen';

INSERT INTO pose_variants (pose_id, slug, name_no, name_en, is_canonical, instruksjon, tilpasning, kontraindikasjon, sort_order)
SELECT id, 'savasana_v1', 'Savasana', 'Shavasana', true,
  ARRAY[
    'Ligg flatt på ryggen, bena litt spredt, armer litt bort fra kroppen med håndflatene opp.',
    'Lukk øynene. Slipp bevisst all spenning fra hvert kroppsdel – fra føtter til ansikt.',
    'La kroppen bli tung som stein. Sinnet er stille og årvåkent – ikke sov.',
    'Bli liggende. Dette er den viktigste posisjonen i praksisen – her integreres alt arbeidet.'
  ],
  'Bruk et teppe over deg for varme. Legg en pute under knærne for korsryggen. Bruk øyepute for dypere ro.',
  NULL,
  34
FROM poses WHERE slug = 'savasana';
