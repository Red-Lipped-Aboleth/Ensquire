CREATE TABLE "user_table" (
	"user_id" serial NOT NULL,
	"first_name" VARCHAR(255) NOT NULL,
	"last_name" VARCHAR(255) NOT NULL,
	"email" VARCHAR(255) NOT NULL UNIQUE,
	"username" VARCHAR(255) NOT NULL UNIQUE,
	"password" VARCHAR(255) NOT NULL,
	"github_user" VARCHAR(255) UNIQUE,
	"character_id" serial NOT NULL UNIQUE,
	CONSTRAINT "user_table_pk" PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "character" (
	"character_id" serial NOT NULL,
	"character_name" VARCHAR(255) NOT NULL,
	"ability_scores_id" serial NOT NULL UNIQUE,
	"race" VARCHAR(255) NOT NULL,
	"level" integer NOT NULL,
	"armor_class" integer NOT NULL,
	"prof_bonus" integer NOT NULL,
	"speed" integer NOT NULL,
	"curr_hp" integer NOT NULL,
	"max_hp" integer NOT NULL,
	"saving_throw_id" serial NOT NULL UNIQUE,
	"skill_id" serial NOT NULL UNIQUE,
	"additional_notes" TEXT NOT NULL,
	"initiative" integer NOT NULL,
	"class" VARCHAR(255) NOT NULL, 
	CONSTRAINT "character_pk" PRIMARY KEY ("character_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "ability_scores" (
	"score_id" serial NOT NULL,
	"str" integer NOT NULL,
	"dex" integer NOT NULL,
	"con" integer NOT NULL,
	"int" integer NOT NULL,
	"wis" integer NOT NULL,
	"cha" integer NOT NULL,
	CONSTRAINT "ability_scores_pk" PRIMARY KEY ("score_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "saving_throw" (
	"throw_id" serial NOT NULL,
	"str" BOOLEAN NOT NULL,
	"dex" BOOLEAN NOT NULL,
	"con" BOOLEAN NOT NULL,
	"int" BOOLEAN NOT NULL,
	"wis" BOOLEAN NOT NULL,
	"cha" BOOLEAN NOT NULL,
	CONSTRAINT "saving_throw_pk" PRIMARY KEY ("throw_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "skills" (
	"skills_id" serial NOT NULL,
	"acrobatics" BOOLEAN NOT NULL,
	"animal_handling" BOOLEAN NOT NULL,
	"arcana" BOOLEAN NOT NULL,
	"athletics" BOOLEAN NOT NULL,
	"deception" BOOLEAN NOT NULL,
	"history" BOOLEAN NOT NULL,
	"insight" BOOLEAN NOT NULL,
	"intimidation" BOOLEAN NOT NULL,
	"investigation" BOOLEAN NOT NULL,
	"medicine" BOOLEAN NOT NULL,
	"nature" BOOLEAN NOT NULL,
	"perception" BOOLEAN NOT NULL,
	"performance" BOOLEAN NOT NULL,
	"persuasion" BOOLEAN NOT NULL,
	"religion" BOOLEAN NOT NULL,
	"sleight_of_hand" BOOLEAN NOT NULL,
	"stealth" BOOLEAN NOT NULL,
	"survival" BOOLEAN NOT NULL,
	CONSTRAINT "skills_pk" PRIMARY KEY ("skills_id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "character" ADD CONSTRAINT "character_fk0" FOREIGN KEY ("character_id") REFERENCES "user_table"("character_id");

ALTER TABLE "ability_scores" ADD CONSTRAINT "ability_scores_fk0" FOREIGN KEY ("score_id") REFERENCES "character"("ability_scores_id");

ALTER TABLE "saving_throw" ADD CONSTRAINT "saving_throw_fk0" FOREIGN KEY ("throw_id") REFERENCES "character"("saving_throw_id");

ALTER TABLE "skills" ADD CONSTRAINT "skills_fk0" FOREIGN KEY ("skills_id") REFERENCES "character"("skill_id");
















{
  characterName: String,
  abilityScores: {
    str: Number,
    dex: Number,
    con: Number,
    int: Number,
    wis: Number,
    cha: Number
  },
  race: String,
  class: String,
  level: Number,
  armorClass: Number,
  profBonus: Number,
  speed: Number,
  currHP: Number,
  maxHP: Number,
  savingThrow: {
    str: Boolean,
    dex: Boolean,
    con: Boolean,
    int: Boolean,
    wis: Boolean,
    cha: Boolean
  }
  skills: {
      acrobatics: Boolean,
      animalHandling: Boolean,
      arcana: Boolean,
      athletics: Boolean,
      deception: Boolean,
      history: Boolean,
      insight: Boolean,
      intimidation: Boolean,
      investigation: Boolean,
      medicine: Boolean,
      nature: Boolean,
      perception: Boolean,
      performance: Boolean,
      persuasion: Boolean,
      religion: Boolean,
      sleightOfHand: Boolean,
      stealth: Boolean,
      survival: Boolean
  }
  additionalNotes: varchar(1billion)
}


    SELECT *
    FROM character c
    WHERE c.character_id = (SELECT user_id FROM user_table WHERE username = 'avaldez')
    INNER JOIN ability_scores s
    ON c.ability_scores_id = s.score_id
    INNER JOIN saving_throw st
    ON c.saving_throw = st.throw_id
    INNER JOIN skills sk
    ON c.skills_id = sk.skills_id;

--Creating a Character:
INSERT INTO character ("character_id", "character_name", "race", "level", "armor_class", "prof_bonus", "speed", "curr_hp", "max_hp", "additional_notes", "initiative")
VALUES ('1', 'dan', 'mush', '0', '20', '3', '10', '10', '10', 'some notes', '5');

INSERT INTO ability_scores VALUES ('4','10', '11', '12', '13', '14', '15');
INSERT INTO saving_throw VALUES ('4','true', 'false', 'true', 'false', 'false', 'false');
INSERT INTO skills VALUES('false', 'false', 'true', 'false', 'false', 'false', 'false', 'false', 'false', 'true', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'true');
INSERT INTO user_table (first_name, last_name, email, username, password) VALUES ('dan', 'teng', 'danteng@email.com', 'danteng', 'something')


-- Query to pull in all character sheet information
SELECT c.*, s.*, st.str AS stStr, st.dex AS stDex, st.con AS stCon, st.int AS stInt, st.wis AS stWis, st.cha AS stWis, sk.*
FROM character c, ability_scores s, saving_throw st, skills sk
WHERE c.character_id = (SELECT user_id FROM user_table WHERE username = 'danteng')
AND c.ability_scores_id = s.score_id
AND c.saving_throw_id = st.throw_id
AND sk.skills_id = sk.skills_id;

UPDATE character
SET character_name = 'newDan', race = 'mush2.0', level = '1', armor_class = '20', prof_bonus = '1', speed = '1', curr_hp = '10', max_hp = '10', additional_notes = 'something', initiative = '2', class = 'student plus'
WHERE character_id = (SELECT user_id FROM user_table WHERE username = 'danteng');

UPDATE ability_scores
SET asStr = $2, asDex = $3, asCon = $4, asInt = $5, asWis = $6, asCha = $7
WHERE score_id = (SELECT user_id FROM user_table WHERE username = $1);