import {
  GambleKingSkill, LanguageInfluenceSkill, ThunderSkill, WizardSkill,
} from './index';

const skillSet = [
  GambleKingSkill,
  LanguageInfluenceSkill,
  ThunderSkill,
  WizardSkill,
];

export function getSkillSet(skillSetId: number) {
  return skillSet[skillSetId % skillSet.length];
}
