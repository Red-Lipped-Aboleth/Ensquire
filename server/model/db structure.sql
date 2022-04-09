CREATE TABLE "User Table" (
	"user_id" serial NOT NULL,
	"firstName" VARCHAR(255) NOT NULL,
	"lastName" VARCHAR(255) NOT NULL,
	"email" VARCHAR(255) NOT NULL UNIQUE,
	"username" VARCHAR(255) NOT NULL UNIQUE,
	"password" VARCHAR(255) NOT NULL,
	"github_User" VARCHAR(255) UNIQUE,
	"character_id" integer NOT NULL,
	CONSTRAINT "User Table_pk" PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Character" (
	"character_id" serial NOT NULL,
	"characterName" VARCHAR(255) NOT NULL,
	"abilityScores_id" integer NOT NULL,
	"race" VARCHAR(255) NOT NULL,
	"level" integer NOT NULL,
	"armorClass" integer NOT NULL,
	"profBonus" integer NOT NULL,
	"speed" integer NOT NULL,
	"currHP" integer NOT NULL,
	"maxHP" integer NOT NULL,
	"savingThrow" integer NOT NULL,
	"skill_id" integer NOT NULL,
	"additionalNotes" TEXT NOT NULL,
	CONSTRAINT "Character_pk" PRIMARY KEY ("character_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Ability Scores" (
	"score_id" serial NOT NULL,
	"str" integer NOT NULL,
	"dex" integer NOT NULL,
	"con" integer NOT NULL,
	"int" integer NOT NULL,
	"wis" integer NOT NULL,
	"cha" integer NOT NULL,
	CONSTRAINT "Ability Scores_pk" PRIMARY KEY ("score_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Saving Throw" (
	"throw_id" serial NOT NULL,
	"str" BOOLEAN NOT NULL,
	"dex" BOOLEAN NOT NULL,
	"con" BOOLEAN NOT NULL,
	"int" BOOLEAN NOT NULL,
	"wis" BOOLEAN NOT NULL,
	"cha" BOOLEAN NOT NULL,
	CONSTRAINT "Saving Throw_pk" PRIMARY KEY ("throw_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Skills" (
	"skills_id" serial NOT NULL,
	"acrobatics" BOOLEAN NOT NULL,
	"animalHandling" BOOLEAN NOT NULL,
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
	"sleightOfHand" BOOLEAN NOT NULL,
	"stealth" BOOLEAN NOT NULL,
	"survival" BOOLEAN NOT NULL,
	CONSTRAINT "Skills_pk" PRIMARY KEY ("skills_id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "User Table" ADD CONSTRAINT "User Table_fk0" FOREIGN KEY ("character_id") REFERENCES "Character"("character_id");

ALTER TABLE "Character" ADD CONSTRAINT "Character_fk0" FOREIGN KEY ("abilityScores_id") REFERENCES "Ability Scores"("score_id");
ALTER TABLE "Character" ADD CONSTRAINT "Character_fk1" FOREIGN KEY ("savingThrow") REFERENCES "Saving Throw"("throw_id");
ALTER TABLE "Character" ADD CONSTRAINT "Character_fk2" FOREIGN KEY ("skill_id") REFERENCES "Skills"("skills_id");









