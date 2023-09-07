import { gql } from "@apollo/client";

// Fragments //

const MOVE_FRAGMENT = gql`
  fragment MoveFragment on Move {
    key
    accuracy
    basePower
    bulbapediaPage
    category
    contestType
    desc
    isFieldMove
    isGMax
    isNonstandard
    isZ
    maxMovePower
    name
    pp
    priority
    serebiiPage
    shortDesc
    smogonPage
    target
    type
    zMovePower
  }
`;

const LEARNSET_LEVEL_UP_MOVE_FRAGMENT = gql`
  ${MOVE_FRAGMENT}
  fragment LearnsetLevelUpMoveFragment on LearnsetLevelUpMove {
    generation
    level
    move {
      ...MoveFragment
    }
  }
`;

const LEARNSET_MOVE_FRAGMENT = gql`
  ${MOVE_FRAGMENT}
  fragment LearnsetMoveFragment on LearnsetMove {
    generation
    move {
      ...MoveFragment
    }
  }
`;

const POKEMON_LEARNSET_FRAGMENT = gql`
  ${LEARNSET_MOVE_FRAGMENT}
  ${LEARNSET_LEVEL_UP_MOVE_FRAGMENT}
  fragment PokemonLearnsetFragment on PokemonLearnset {
    dreamworldMoves {
      ...LearnsetMoveFragment
    }
    eggMoves {
      ...LearnsetMoveFragment
    }
    eventMoves {
      ...LearnsetMoveFragment
    }
    tmMoves {
      ...LearnsetMoveFragment
    }
    tutorMoves {
      ...LearnsetMoveFragment
    }
    virtualTransferMoves {
      ...LearnsetMoveFragment
    }
    levelUpMoves {
      ...LearnsetLevelUpMoveFragment
    }
  }
`;

const GENERATIONAL_POKEMON_LEARNSET_FRAGMENT = gql`
  ${POKEMON_LEARNSET_FRAGMENT}
  fragment GenerationalPokemonLearnsetFragment on GenerationalPokemonLearnset {
    generation3 {
      ...PokemonLearnsetFragment
    }
    generation4 {
      ...PokemonLearnsetFragment
    }
    generation5 {
      ...PokemonLearnsetFragment
    }
    generation6 {
      ...PokemonLearnsetFragment
    }
    generation7 {
      ...PokemonLearnsetFragment
    }
    generation8 {
      ...PokemonLearnsetFragment
    }
  }
`;

const EV_YIELDS_FRAGMENT = gql`
  fragment EvYieldsFragment on EvYields {
    hp
    attack
    defense
    specialattack
    specialdefense
    speed
  }
`;

const FLAVOR_FRAGMENT = gql`
  fragment FlavorFragment on Flavor {
    flavor
    game
  }
`;

const GENDER_FRAGMENT = gql`
  fragment GenderFragment on Gender {
    female
    male
  }
`;

const POKEMON_TYPE_FRAGMENT = gql`
  fragment PokemonTypeFragment on PokemonType {
    name
    matchup {
      attacking {
        doubleEffectiveTypes
        doubleResistedTypes
        effectiveTypes
        effectlessTypes
        normalTypes
        resistedTypes
      }
      defending {
        doubleEffectiveTypes
        doubleResistedTypes
        effectiveTypes
        effectlessTypes
        normalTypes
        resistedTypes
      }
    }
  }
`;

const STATS_FRAGMENT = gql`
  fragment StatsFragment on Stats {
    hp
    attack
    defense
    specialattack
    specialdefense
    speed
  }
`;

const CATCH_RATE_FRAGMENT = gql`
  fragment CatchRateFragment on CatchRate {
    base
    percentageWithOrdinaryPokeballAtFullHealth
  }
`;

const FULL_DATA_FRAGMENT_WITHOUT_NESTED = gql`
  ${EV_YIELDS_FRAGMENT}
  ${FLAVOR_FRAGMENT}
  ${GENDER_FRAGMENT}
  ${POKEMON_TYPE_FRAGMENT}
  ${STATS_FRAGMENT}
  ${CATCH_RATE_FRAGMENT}
  fragment FullDataFragmentWithoutNested on Pokemon {
    key
    eggGroups
    evYields {
      ...EvYieldsFragment
    }
    evolutionLevel
    flavorTexts {
      ...FlavorFragment
    }
    forme
    formeLetter
    gender {
      ...GenderFragment
    }
    height
    isEggObtainable
    backSprite
    levellingRate
    maximumHatchTime
    minimumHatchTime
    num
    otherFormes
    serebiiPage
    shinyBackSprite
    shinySprite
    smogonPage
    baseForme
    smogonTier
    species
    sprite
    types {
      ...PokemonTypeFragment
    }
    baseSpecies
    baseStats {
      ...StatsFragment
    }
    baseStatsTotal
    bulbapediaPage
    catchRate {
      ...CatchRateFragment
    }
    color
    cosmeticFormes
    weight
  }
`;

const ABILITY_FRAGMENT = gql`
  ${FULL_DATA_FRAGMENT_WITHOUT_NESTED}
  ${GENERATIONAL_POKEMON_LEARNSET_FRAGMENT}
  fragment AbilityFragment on Ability {
    name
    key
    bulbapediaPage
    desc
    isFieldAbility
    serebiiPage
    shortDesc
    smogonPage
    pokemonThatHaveThisAbility {
      ...FullDataFragmentWithoutNested
      learnsets {
        ...GenerationalPokemonLearnsetFragment
      }
    }
  }
`;

const ABILITIES_FRAGMENT = gql`
  ${ABILITY_FRAGMENT}
  fragment AbilitiesFragment on Abilities {
    first {
      ...AbilityFragment
    }
    second {
      ...AbilityFragment
    }
    hidden {
      ...AbilityFragment
    }
    special {
      ...AbilityFragment
    }
  }
`;

const FULL_DATA_FRAGMENT = gql`
  ${ABILITIES_FRAGMENT}
  ${GENERATIONAL_POKEMON_LEARNSET_FRAGMENT}
  ${FULL_DATA_FRAGMENT_WITHOUT_NESTED}
  fragment FullDataFragment on Pokemon {
    abilities {
      ...AbilitiesFragment
    }
    learnsets {
      ...GenerationalPokemonLearnsetFragment
    }
    ...FullDataFragmentWithoutNested
  }
`;

const FULL_DATA = gql`
  ${FULL_DATA_FRAGMENT}
  fragment FullData on Pokemon {
    ...FullDataFragment
    evolutions {
      ...FullDataFragment
      evolutions {
        ...FullDataFragment
      }
      preevolutions {
        ...FullDataFragment
      }
    }
    preevolutions {
      ...FullDataFragment
      evolutions {
        ...FullDataFragment
      }
      preevolutions {
        ...FullDataFragment
      }
    }
  }
`;

// Queries //
export const GET_ALL_POKEMON = gql`
  ${FULL_DATA}
  query GetAllPokemon($offset: Int, $take: Int) {
    getAllPokemon(offset: $offset, take: $take) {
      ...FullData
    }
  }
`;

export const GET_POKEMON = gql`
  ${FULL_DATA}
  query GetPokemon($pokemon: PokemonEnum!) {
    getPokemon(pokemon: $pokemon) {
      ...FullData
    }
  }
`;
