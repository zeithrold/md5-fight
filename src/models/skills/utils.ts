import {
  GambleKingSkill,
  LanguageInfluenceSkill,
  ThunderSkill,
  WizardSkill,
  Skill,
  HealingSkill,
  BloodMagicSkill,
} from './index';

const skillSet: (typeof Skill)[][] = [
  [GambleKingSkill],
  [LanguageInfluenceSkill],
  [ThunderSkill],
  [WizardSkill],
  [HealingSkill],
  [BloodMagicSkill],
];

export function getSkillSet(skillSetId: number) {
  return skillSet[skillSetId % skillSet.length];
}
