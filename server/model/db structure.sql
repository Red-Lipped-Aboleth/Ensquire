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





