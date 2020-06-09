import {
  GambleKingSkill,
  LanguageInfluenceSkill,
  ThunderSkill,
  WizardSkill,
  Skill,
  HealingSkill,
  BloodMagicSkill,
  RapidKnifeSkill,
} from './index';

const skillSet: (typeof Skill)[][] = [
  [GambleKingSkill],
  [LanguageInfluenceSkill],
  [ThunderSkill],
  [WizardSkill],
  [HealingSkill],
  [BloodMagicSkill],
  [RapidKnifeSkill],
];

export function getSkillSet(skillSetId: number) {
  return skillSet[skillSetId % skillSet.length];
}
