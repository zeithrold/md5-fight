import {
  GambleKingSkill, LanguageInfluenceSkill, ThunderSkill, WizardSkill, Skill,
} from './index';

const skillSet: (typeof Skill)[][] = [
  [GambleKingSkill],
  [LanguageInfluenceSkill],
  [ThunderSkill],
  [WizardSkill],
];

export function getSkillSet(skillSetId: number) {
  return skillSet[skillSetId % skillSet.length];
}
