import {
  GambleKingSkill, LanguageInfluenceSkill, ThunderSkill, WizardSkill, Skill, HealingSkill,
} from './index';

const skillSet: (typeof Skill)[][] = [
  [GambleKingSkill],
  [LanguageInfluenceSkill],
  [ThunderSkill],
  [WizardSkill],
  [HealingSkill],
];

export function getSkillSet(skillSetId: number) {
  return skillSet[skillSetId % skillSet.length];
}
