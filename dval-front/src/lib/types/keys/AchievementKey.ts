export type AchievementKey =
	| 'TalesOfMonstrousMadness' // Tales of Monstrous Madness
	| 'ZooTycoon1' // Zoo Tycoon 1
	| 'ZooTycoon2' // Zoo Tycoon 2
	| 'ZooTycoon3' // Zoo Tycoon 3
	| 'ItsYesterdayOnceMore1' // It's Yesterday Once More 1
	| 'ItsYesterdayOnceMore2' // It's Yesterday Once More 2
	| 'ItsYesterdayOnceMore3' // It's Yesterday Once More 3
	| 'OverlookingView' // Overlooking View
	| 'TheRemainsOfTheGale' // The Remains of the Gale
	| 'SeedsOfStoriesBroughtByTheWind' // "Seeds of Stories, Brought by the Wind..."
	| 'Unswerving' // Unswerving
	| 'InitiatingWarpDrive' // Initiating Warp Drive!
	| 'BelovedOfTheAnemoArchon' // Beloved of the Anemo Archon
	| 'TheBestSwordInTheCemetery' // The Best Sword in the Cemetery
	| 'HiddenPalaceOfGuizangFormula' // Hidden Palace of Guizang Formula
	| 'CeciliaGarden' // Cecilia Garden
	| 'HiddenPalaceOfZhouFormula' // Hidden Palace of Zhou Formula
	| 'IfYouPutYourHeartIntoIt' // "If you put your heart into it..."
	| 'AnyoneCanBeAGourmet' // "...Anyone can be a gourmet."
	| 'BoaredToDeath' // Boared to Death
	| 'GoldenGlidingLicense' // Golden Gliding License
	| 'ItsTheSameAsHavingWings' // It's the Same As Having Wings
	| 'QuickAsLightning' // Quick As Lightning
	| 'FriendsTheWorldOver' // Friends the World Over
	| 'MegastarInMondstadt' // Megastar in Mondstadt
	| 'LegendInLiyue' // Legend in Liyue
	| 'IllustriousInInazuma' // Illustrious in Inazuma
	| 'QuestClear1' // QUEST CLEAR 1
	| 'QuestClear2' // QUEST CLEAR 2
	| 'QuestClear3' // QUEST CLEAR 3
	| 'Hero-In-Training1' // Hero-in-Training 1
	| 'Hero-In-Training2' // Hero-in-Training 2
	| 'Hero-In-Training3' // Hero-in-Training 3
	| 'QuestFailed' // QUEST FAILED
	| 'TheBleakMidwinter' // The Bleak Midwinter
	| 'PriestPrincessAndScribe' // Priest, Princess, and Scribe
	| 'ProdigalSonsReturn' // Prodigal Son's Return
	| 'Snow-StoredHistory' // Snow-Stored History
	| 'GlacialSteel' // Glacial Steel
	| 'FutileEndeavor' // Futile Endeavor
	| 'UntellableTale' // Untellable Tale
	| 'ToweringAchievement' // Towering Achievement
	| 'WinterWonderland' // Winter Wonderland
	| 'TheHunterBecomesTheHunted' // The Hunter Becomes the Hunted
	| 'ChillOut' // Chill Out!
	| 'GluttonForGoulash' // Glutton for Goulash
	| 'WrathOfTheGods' // Wrath of the Gods
	| 'SkyHigh' // Sky High
	| 'TransmutationNuclide' // Transmutation Nuclide
	| 'YouCouldHearPaimonAllAlongCouldntYou' // ...You could hear Paimon all along, couldn't you?
	| 'Yo-Ho-HoAndABottleOfDandelionWine' // Yo-Ho-Ho, and a Bottle of Dandelion Wine
	| 'MightyAndIlluminatedWaveRider' // Mighty and Illuminated Wave Rider
	| 'NiceBoat' // Nice Boat!
	| 'AndHerNameIsTheMaryCeleste' // ...And Her Name Is the Mary Celeste
	| 'DéjàVu' // Déjà Vu!
	| 'YamadaGosWoodenMallet' // Yamada Go's Wooden Mallet
	| 'KujiraiArtTemariJutsu' // "Kujirai Art, Temari Jutsu"
	| 'TemariForLife' // Temari for Life
	| 'PaimonsLuckyDay' // Paimon's Lucky Day!
	| 'JustMyLuck' // Just My Luck...
	| 'UndergroundOverrated' // Underground... Overrated?
	| 'ShuumatsuGaiden' // SHUUMATSU GAIDEN
	| 'IwakuraOut' // Iwakura Out
	| 'WhoLetTheDogsOut' // Who Let the Dogs Out
	| 'YouCantHelpYourFeelings' // You Can't Help Your Feelings
	| 'TheyShallNotGrowOld' // They Shall Not Grow Old
	| 'OhTheHumanity' // Oh, the Humanity!
	| 'AHollowSoul' // A Hollow Soul
	| 'RiseAndShrine' // Rise and Shrine
	| 'And1WouldWalk3000More' // ...And I Would Walk 3,000 More
	| 'ADoctorsOdyssey' // A Doctor's Odyssey
	| 'KnockKnock' // Knock Knock
	| 'KannazukaBattlePlan' // Kannazuka Battle Plan
	| 'WhyWeFight' // Why We Fight
	| 'Oowazamono' // Oowazamono
	| 'SecondBlooming' // Second Blooming
	| 'ThankYouComeAgain' // Thank You, Come Again
	| 'ShockingPositivelyShocking' // Shocking... Positively Shocking
	| 'Jackpot' // Jackpot
	| 'BladeOfTatara' // Blade of Tatara
	| 'RestInPeace' // Rest in Peace
	| 'ThatsWhatTheyCallAGetaway' // "That's What They Call a Getaway!"
	| 'OhSoThatsHowYouFish' // "Oh, so That's How You Fish..."
	| 'AsYouWish' // As You Wish
	| 'AMermaidsTale' // A Mermaid's Tale
	| 'ADistantSeaShepherdsTreasure' // A Distant Sea Shepherd's Treasure
	| 'LongJohnSilver' // Long John Silver
	| 'TodayThisSeal—TomorrowWatatsumiIsland' // Today, This Seal — Tomorrow, Watatsumi Island!
	| 'PalaceInAPool' // Palace in a Pool
	| 'TheStrandingOfTheBeagle' // The Stranding of the Beagle
	| '1AmACatNamedNeko' // "I am a cat named Neko."
	| 'CatInTheClouds' // Cat in the Clouds
	| 'ACatsGift' // A Cat's Gift
	| 'ItHasToBeTreasure' // It Has to Be Treasure
	| 'OnTheOtherSideOfHomesickness' // On the Other Side of Homesickness
	| 'ThisAndThat' // This and That...
	| 'DavyJonesLocker' // Davy Jones' Locker
	| 'SeaOfPuzzles' // Sea of Puzzles
	| 'GreatAmakumoPeak' // Great Amakumo Peak
	| 'TraverseTheFogDoor' // Traverse the Fog Door
	| 'NihilSubCaligineNovum' // Nihil Sub Caligine Novum
	| 'WhitesIllusion' // White's Illusion
	| 'LovelySightsFurtherThanTheEyeCanSee' // "Lovely Sights, Further Than the Eye Can See"
	| 'ATaleOfTwoCities' // A Tale of Two Cities
	| 'MyLifeAsAnAdventurer' // "My Life as an Adventurer"
	| 'LightUpTheFog' // Light Up the Fog
	| 'P—PaimonAteIt' // "P—Paimon ate it..."
	| 'GuessingGame' // Guessing Game
	| 'ThunderbirdsLineage' // Thunderbird's Lineage
	| 'SevenLetters' // Seven Letters
	| 'MoshiriKara' // Moshiri Kara
	| 'AcrossTheMistyRiver' // Across the Misty River
	| 'NotFlyinAwayThisTime' // "Not Flyin' Away This Time!"
	| 'TheNetClosesIn' // The Net Closes In
	| 'N-ThousandLeaguesUnderTheSea' // N-Thousand Leagues Under the Sea
	| 'FlowingSunfireAlsoKnownAsMarishi' // Flowing Sunfire, Also Known as Marishi
	| 'OfSunAndMoon' // Of Sun and Moon
	| 'ExtensiveAndMeticulous' // "Extensive And Meticulous"
	| 'TheEelInWinterSought' // "The Eel in Winter Sought"
	| 'UnmatchedThroughoutTokoyo' // "Unmatched Throughout Tokoyo"
	| 'MaybeGetYourselfAMoreSocialHobby' // "Maybe Get Yourself a More Social Hobby..."
	| 'IfTokoyoOokamiKnewOfThis' // "If Tokoyo Ookami Knew of This..."
	| 'WhatDifferenceDoesThisMake' // "What Difference Does This Make?"
	| 'TheChildrenOfGodShallDance' // The Children of God Shall Dance
	| 'LightAndDarkDuskAndDawn' // Light and Dark, Dusk and Dawn
	| 'StepRightUp' // Step Right Up!
	| 'TheIll-StarredLegacyOfIwakura' // The Ill-Starred Legacy of Iwakura
	| 'OneKeyForEachLock' // One Key for Each Lock
	| 'TheLostValley' // The Lost Valley
	| 'TheChasmMiningRecords' // The Chasm Mining Records
	| 'PeopleOfTheValleyOfLife' // People of the Valley of Life
	| 'CredeTenebris' // CREDE TENEBRIS
	| 'TheNine-WordRumor' // The Nine-Word Rumor
	| 'DenOfThieves' // Den of Thieves
	| 'DingDingDingWeHaveAWinnerAgain' // Ding Ding Ding, We Have a Winner! Again!
	| 'OfTheHumanHeartManyEssaysWritten' // Of the Human Heart Many Essays Written
	| 'IfNotUsThenWho' // If Not Us, Then Who?
	| 'MaintainSafetyDistance' // Maintain Safety Distance
	| 'BirthPainsOfTheDarkFog' // Birth Pains of the Dark Fog
	| 'TheAlchemistake' // The Alchemistake
	| 'ValorsAfterglow' // Valor's Afterglow
	| 'NotForLong-TermConsumption' // Not for Long-Term Consumption
	| 'TheMushroomThatAsksTooMuch' // The Mushroom That Asks Too Much
	| 'TheMillelithShallNeverBeMoved' // The Millelith Shall Never Be Moved
	| 'JackOfNoTrades' // Jack of No Trades
	| 'WellDoneStierlitz' // Well Done, Stierlitz!
	| 'YetTheDarknessDidNotOvercomeIt' // Yet the Darkness Did Not Overcome It...
	| 'SmellsLikeAsphalt' // "...Smells Like Asphalt."
	| 'AllWeNeedIsSomeFirewoodAndSomeVinegar' // "All We Need Is Some Firewood and Some Vinegar..."
	| 'TheTomeOfTaliesin' // The Tome of Taliesin
	| 'LightUpTheDark' // Light Up the Dark
	| 'NaturesInfiniteWit' // Nature's Infinite Wit
	| 'ForMeritoriousService' // For Meritorious Service
	| 'PortalOfMarvels' // Portal of Marvels
	| 'PerchedBetweenDreamAndReality' // Perched Between Dream and Reality
	| 'MusicOfTheForest' // Music of the Forest
	| 'ALeisurelyJourney' // A Leisurely Journey
	| 'GlitteringMelody' // Glittering Melody
	| 'TheTaleOfTheForest' // The Tale of the Forest
	| 'AOnce-EmeraldNursery' // A Once-Emerald Nursery
	| 'TheEndOfAnnihilation' // The End of Annihilation
	| 'ThoughToTheEarth1MayReturn' // Though to the Earth I May Return...
	| 'EverAnOutcastInTheForest' // Ever an Outcast in the Forest
	| 'MasterChefVanarana' // Master Chef: Vanarana
	| 'OpenSesame' // Open Sesame!
	| 'AConversationWithTheTreasureChestOwner' // A Conversation with the Treasure Chest Owner
	| 'Vamadha-Go-Round' // Vamadha-Go-Round
	| 'InTheNameOfAnfortas' // In the Name of Anfortas
	| 'CallOfTheNamelessCity' // Call of the Nameless City
	| 'WalkingWithWaterAndWind' // Walking with Water and Wind
	| 'LetMeFadeWithMemory' // ...Let Me Fade With Memory
	| 'NowLetTimeResume' // Now Let Time Resume
	| 'PleasePlaySafely' // Please Play Safely
	| 'EternalSustenance' // Eternal Sustenance
	| 'WhenTheDreamsBloom' // When the Dreams Bloom
	| 'AWalnutTreeAmidstTheGardens' // A Walnut Tree Amidst the Gardens
	| 'SumeruMonsterEcologySurvey' // Sumeru Monster Ecology Survey
	| 'AsTheLionSearchedForCourage' // As the Lion Searched for Courage...
	| 'SummitOfWisdom' // Summit of Wisdom
	| 'Explorer' // Explorer
	| 'TheJasminesWhisperThePomegranatesAreGlad' // The Jasmines Whisper, the Pomegranates Are Glad
	| 'SwiftAsTheWind' // Swift as the Wind
	| 'TheRuleOfThree' // The Rule of Three
	| 'TheBitterFruitOfDreams' // The Bitter Fruit of Dreams
	| 'TheRainSeepsIntoTheSoil' // The Rain Seeps Into the Soil
	| 'TheyEnterTheFlow' // They Enter the Flow
	| 'WeatherControlActivated' // Weather Control Activated
	| 'OhFrabjousDay' // Oh, Frabjous Day!
	| 'KarasChild' // Kara's Child
	| 'TheLengthyReunion' // The Lengthy Reunion
	| '1VeGotIt1VeGotIt' // "I've Got It! I've Got It!"
	| 'SongOfNightAndDawn' // Song of Night and Dawn
	| 'CloseEncountersOfTheWhichKind' // Close Encounters of the Which Kind?
	| 'ExplorationInTheDesert' // Exploration in the Desert
	| 'ThinkingLikeAVahumanaScholar' // Thinking Like a Vahumana Scholar
	| 'FataMorgana' // Fata Morgana
	| 'CreateSwapStoreAndUse' // Create, Swap, Store, and Use
	| 'TheAmazingPyramid' // The Amazing Pyramid
	| 'WalkLikeKingDeshretsPeople' // Walk Like King Deshret's People
	| 'TheStraightPath' // The Straight Path
	| 'ThePathToEnlightenment' // The Path to Enlightenment
	| 'Encore' // Encore!
	| 'RecliningOnTopOfTheWorld' // Reclining on Top of the World
	| 'WhatDoesThisButtonDo' // What Does This Button Do?
	| 'TheBreakthrough' // The Breakthrough
	| 'WhatsThePassword' // What's the Password?
	| 'TheEndOfTheCorridor' // The End of the Corridor
	| 'TheKingOfFourLands' // The King of Four Lands
	| 'ScarletReignsGreatRedSand' // Scarlet Reign's Great Red Sand
	| 'Engraved' // Engraved
	| 'BeforeMyTime' // Before My Time
	| 'TheIllusoryCity' // The Illusory City
	| 'HowDoYouWriteTheExcavationReport' // How Do You Write the Excavation Report?
	| 'DriftingInTheWind' // Drifting in the Wind
	| 'OneFlewOverTheSickMensRest' // One Flew Over the Sick Men's Rest
	| 'AWell-TrainedArchaeologist' // A Well-Trained Archaeologist
	| 'BeyondTheShadowOfTime' // Beyond the Shadow of Time
	| 'IfTheyHadKnownTheUnseen' // "If They Had Known the Unseen..."
	| 'ItsOnlyAnEternityOfServitude' // "It's Only an Eternity of Servitude!"
	| 'TheNamelessCitysPast' // The Nameless City's Past
	| 'TheSilentDreamlessParadise' // The Silent, Dreamless Paradise
	| 'ForSheShallSurelyRequite' // "...For She Shall Surely Requite."
	| 'LaLunaRossa' // La Luna Rossa
	| 'FlatOut' // Flat Out
	| '1HateEmMyself' // "I Hate 'Em Myself!"
	| 'GenesisOfTheRift' // Genesis of the Rift
	| 'DidntEvenNeedAManual' // Didn't Even Need a Manual...
	| 'HuntersMercy' // Hunter's Mercy
	| 'OnAMagicCarpetRide' // On a Magic Carpet Ride
	| 'IsntLifeWondrous' // "Isn't Life Wondrous?"
	| 'TheAncientOrchardAndSpring' // The Ancient Orchard and Spring
	| 'InHerFullGlory' // In Her Full Glory...
	| 'ShewTheKingdomsThyShame' // "...Shew the Kingdoms Thy Shame."
	| 'FromSoilYouAreAndToTheSandYouShallReturn' // From Soil You Are, and to the Sand You Shall Return...
	| 'ThePerfectSandstorm' // The Perfect Sandstorm
	| 'TheLovelessTarantula' // The Loveless Tarantula
	| 'ParvezravanKhwarrah' // Parvezravan Khwarrah
	| 'AVeryLongEngagement' // A Very Long Engagement
	| 'WhereTheLightTouches' // Where the Light Touches
	| 'LikeAMorningSunComingOutOfGloomyMountains' // Like a Morning Sun Coming Out of Gloomy Mountains
	| 'TheTreeOnTheHill' // The Tree on the Hill
	| 'BeneathTheFog' // Beneath the Fog
	| 'HicPulso' // Hic Pulso
	| 'VyakaranaOfTheBirds' // Vyakarana of the Birds
	| 'BeholdMyRighteousStrike' // Behold My Righteous Strike!
	| 'AbandonAllHopeYeWhoEnterHere' // "...Abandon All Hope, Ye Who Enter Here."
	| 'Fabricator-General' // Fabricator-General
	| 'TrialOfHaft-Vádí' // Trial of Haft-Vádí
	| 'ARopeOverAnAbyss' // A Rope Over an Abyss
	| 'TheCamelTheLionAndTheChild' // The Camel, the Lion, and the Child
	| 'TheDayOfTirgan' // The Day of Tirgan
	| 'AFascinatingJourney' // A Fascinating Journey
	| 'ThisMysteryIsSolved' // "This Mystery Is Solved!"
	| 'Homeward-BoundSpirits' // Homeward-Bound Spirits
	| 'TheSeaOfFertility' // The Sea of Fertility
	| 'TheBraveShallNotFalter' // The Brave Shall Not Falter
	| 'Bifröst' // Bifröst
	| 'SevenDishDance' // Seven Dish Dance
	| 'ShiningInTheMire' // Shining in the Mire
	| 'WhenTheRedScarfTransformsIntoABirdInFlight' // When the Red Scarf Transforms Into a Bird in Flight...
	| 'SoaringInTheSkiesOfSary-Ozek' // Soaring in the Skies of Sary-Ozek
	| 'WhoseDescendantAreYouAndWhatsYourName' // Whose Descendant Are You, and What's Your Name?
	| 'UseTheForceSorush' // Use the Force, Sorush
	| 'AngleEraser' // Angle Eraser
	| 'CoreCooling' // Core Cooling
	| 'TheWhiteShip' // The White Ship
	| 'TrulyMouthwatering' // Truly Mouthwatering!
	| 'EncyclopediaOfNaturalPhilosophy' // Encyclopedia of Natural Philosophy
	| 'AFontainianMessage' // A Fontainian Message
	| 'NothingButAHoundDog' // Nothing but a Hound Dog...
	| 'ItsFish1AddedFish' // It's Fish, I Added Fish
	| 'WelcomeToFontaine' // Welcome to Fontaine
	| 'SognoDiVolare' // Sogno di Volare
	| 'BirthOfTheModernClock' // Birth of the Modern Clock
	| 'WaterworldFuture' // Waterworld Future
	| 'AestheticsOfUgliness' // Aesthetics of Ugliness
	| 'LikeTearsInTheRain' // Like Tears in the Rain
	| 'BlubbyChubbyCreativeEvolution' // Blubby, Chubby, Creative Evolution
	| 'TheseAreAFewOfMy' // These Are a Few of My...
	| 'AnEyeForAnEye' // An Eye for an Eye
	| 'DoYouBelieveInRapture' // Do You Believe In Rapture?
	| 'HardshipsExperienced' // Hardships Experienced...
	| 'AndAfterThat' // And After That...
	| 'AStudyInSable' // A Study in Sable
	| 'TwentyThousandLeaguesUnderTheSea' // Twenty Thousand Leagues Under the Sea
	| 'SongOfTheAncients' // Song of the Ancients
	| 'NinianneOfTheLake' // Ninianne of the Lake
	| 'VivianneOfTheLake' // Vivianne of the Lake
	| 'FontaineExpectsThatEveryoneWillDoTheirDuty' // Fontaine Expects That Everyone Will Do Their Duty
	| 'InSearchOfFritteredTime' // In Search of Frittered Time
	| 'OceanCircuitJudge' // Ocean Circuit Judge
	| 'IronViscount' // Iron Viscount
	| 'DobharcuLordOfTheHidden' // Dobharcu, Lord of the Hidden
	| 'FadingVeteran' // Fading Veteran
	| 'SwordsOfTheGorge' // Swords of the Gorge
	| 'TheFairyKnightTwins' // The Fairy Knight Twins
	| 'ConsumerSociety' // Consumer Society
	| 'WhenTheClockStrikesMidnight' // When the Clock Strikes Midnight
	| 'Non-Zero-SumGame' // Non-Zero-Sum Game
	| 'TheSuperfluousMansAccount' // The Superfluous Man's Account
	| 'LesQuatreCoups' // Les Quatre Coups
	| 'WhatLiesAtTheEndOfTheRainbow' // What Lies at the End of the Rainbow...?
	| 'ComeOnOutMysteryOreGrantMyWish' // Come on out, Mystery Ore! Grant my wish!
	| 'NotSoStraitIsTheGate' // Not So Strait Is the Gate
	| 'TheRemainsOfTheDay' // The Remains of the Day
	| 'TheCalendarOfTheFutureIsLongerThanTheDiaryOfThePast' // The Calendar of the Future Is Longer Than the Diary of the Past
	| 'BreakTheTimeZone' // Break the Time Zone
	| 'TheForgottenReam' // The Forgotten Ream
	| 'WhileMotorsSleep' // While Motors Sleep...
	| 'TheWorstFontainesEightEvilClockworkKnights' // The Worst! Fontaine's Eight Evil Clockwork Knights!
	| 'AutomatedSupercomputingFieldGenerator' // "Automated Supercomputing Field Generator"
	| 'Slam-BangNo-HoldsBarredMeropide-StylePankration' // Slam-Bang No-Holds Barred Meropide-Style Pankration
	| 'UndocumentedFeature' // Undocumented Feature
	| 'LeScaphandreEtLePufferfruit' // Le Scaphandre et le Pufferfruit
	| 'LuachraTheBrilliant' // "Luachra the Brilliant"
	| 'MiredInRedTape' // Mired in Red Tape
	| 'SolitaryReport' // Solitary Report
	| 'TheRedMeaniesRevenge' // The Red Meanies' Revenge
	| 'TheFinalFontaSea1' // The Final Fonta Sea 1
	| 'TheFinalFontaSea2' // The Final Fonta Sea 2
	| 'TheFinalFontaSea3' // The Final Fonta Sea 3
	| 'WhatNewTide' // "...What New Tide?"
	| 'APerfectYesterday' // A Perfect Yesterday
	| 'ThanksForYourPatronage' // Thanks For Your Patronage!
	| 'Yseut' // "Yseut"
	| 'TomorrowAndTomorrowAndTomorrow' // Tomorrow, and Tomorrow, and Tomorrow
	| 'NarzissenkreuzNotesTheLabyrinth' // Narzissenkreuz Notes: The Labyrinth
	| 'OneInvolvedInTheMatter' // One Involved in the Matter
	| 'AnImmortalEmperorInAMundaneUniverse' // An Immortal Emperor in a Mundane Universe
	| 'FarewellMrEliphas' // Farewell, Mr. Eliphas
	| 'SatisfactoryNavalForce' // Satisfactory Naval Force
	| 'SpaceForceCadet' // Space Force Cadet
	| 'TheStoryIsOverBut' // The Story Is Over, But...
	| '1FeardTheFuryOfMyWind' // I Fear'd the Fury of My Wind
	| 'APredictableEnding' // A Predictable Ending
	| 'AWorldYetToBeDisenchanted' // A World Yet to Be Disenchanted
	| 'ÀLaVolontéDuPeuple' // À la volonté du peuple
	| 'CrowOrBlackbird' // Crow or Blackbird?
	| 'DeianeiraOfSnezhevna' // Deianeira of Snezhevna
	| '1DoBelieveInFairies' // I Do Believe in Fairies
	| 'InTheLanguageOfFlowersTheLumidouceBellMeans' // In the Language of Flowers, the Lumidouce Bell Means...?
	| 'HopeIsANiceWord' // Hope Is a Nice Word
	| 'EvenCaesarCouldNotBuyThisFromMe' // Even Caesar Could Not Buy This From Me
	| 'Chassanion' // Chassanion
	| 'MagebladeCorrouge' // Mageblade Corrouge
	| 'RockyAvildsen' // Rocky Avildsen
	| 'Liam' // Liam
	| 'AHumanDrama' // A Human Drama
	| 'RulersOfTheChizhangMountains' // "Rulers of the Chizhang Mountains"
	| 'TheSupremeSecret' // The Supreme Secret
	| 'TrueMasteryOfSpearAndSword' // True Mastery of Spear and Sword
	| 'ARuinedTale' // A Ruined Tale
	| 'GoodAsNew' // Good as New
	| 'BreakTheBenighting' // Break the Benighting
	| 'ToTouchTheFaceOfHeaven' // To Touch the Face of Heaven
	| 'AMereRock' // A Mere Rock...
	| 'Tea1AmTeaInACauldron' // Tea I Am, Tea in a Cauldron
	| 'WhenComesSpringOrAutumn' // When Comes Spring or Autumn?
	| 'WhatAboutSlicedMeatNow' // "What About Sliced Meat Now?"
	| 'LongDaysInTheRealmWithin' // Long Days in the Realm Within
	| 'Cloud-PartingCarpfall' // Cloud-Parting Carpfall
	| 'FiveBladesReturnToWangshan' // Five Blades Return to Wangshan
	| 'HangingGardensOfPluckedJade' // Hanging Gardens of Plucked Jade
	| 'WannaLearn1LlTeachYou' // "Wanna Learn? I'll Teach You!"
	| 'TheMuralVeil' // The Mural Veil
	| 'BreakingIronAndStone' // Breaking Iron and Stone
	| 'ChenyuValeSights' // Chenyu Vale Sights
	| 'XiangjunsDreams' // Xiangjun's Dreams
	| 'SwiftAcceptance' // Swift Acceptance
	| 'Non-HiddenBackupEnergySource' // Non-Hidden Backup Energy Source
	| 'AtTheConstructionOfTheEndlessWall' // At the Construction of the Endless Wall
	| 'UpTheBishui' // Up the Bishui
	| 'TheCarpLeapsHeavensGatesOpen' // The Carp Leaps, Heaven's Gates Open
	| 'SpiritsAdriftAlasInWater' // Spirits Adrift, Alas, in Water
	| 'JadeOJadeGrantMeMyWish' // "Jade, O Jade, Grant Me My Wish..."
	| 'AsIfSeenFromAfar' // As If Seen From Afar
	| 'AncientShaman-Song' // Ancient Shaman-Song
	| 'TheSecludedPath' // The Secluded Path
	| 'SecretMiracle' // Secret Miracle
	| 'Juggernaut' // Juggernaut
	| 'ThePrismProgram' // The PRISM Program
	| 'ThatsOneBigCrystalfly' // "That's one big Crystalfly"
	| 'NotIndicativeOfFinalProduct' // "...Not indicative of final product"
	| 'TheBiggerTheyAre' // The Bigger They Are...
	| 'ThroughPass' // Through Pass
	| 'DolorousStroke' // Dolorous Stroke
	| 'HilichurlChampion' // Hilichurl Champion
	| 'BonAppétit' // Bon Appétit
	| 'PurveyorOfPunishment1' // Purveyor of Punishment 1
	| 'PurveyorOfPunishment2' // Purveyor of Punishment 2
	| 'PurveyorOfPunishment3' // Purveyor of Punishment 3
	| 'FantasticFour' // Fantastic Four
	| 'TakeThatYouOverblownMistFlower' // "Take That, You Overblown Mist Flower!"
	| 'ThatWasBloomingHot' // "That Was Blooming Hot"
	| 'OutlanderVsOutlander' // Outlander Vs. Outlander
	| 'Penalty' // Penalty
	| 'ForceFieldErosion' // Force Field Erosion
	| 'Lizard-Spock' // "...Lizard-Spock"
	| 'AHouseIll-Founded' // A House Ill-Founded
	| 'NoneStandSecure' // None Stand Secure
	| 'BackWithTheWind' // Back With the Wind
	| 'CoreMeltdown' // Core Meltdown
	| 'Knockout' // Knockout
	| 'TillDebtDoUsPart' // "...Till Debt Do Us Part"
	| 'MeltingAway' // "Melting... Away..."
	| 'AndYouCallYourselfOneOfTheFourWinds' // And You Call Yourself One of the Four Winds
	| 'TouchAndGo' // Touch and Go
	| 'Deflection' // Deflection!
	| 'YouCanHaveThoseBack' // You Can Have Those Back!
	| 'SternestOfSouls' // Sternest of Souls
	| 'ASingleNightsWork' // "...A Single Night's Work"
	| 'Knee-DeepSnow' // "Knee-Deep Snow..."
	| 'If1RunFastEnough' // If I Run Fast Enough...
	| 'InThisSolemnMatterLetNoOneInterfere' // In This Solemn Matter Let No One Interfere!
	| 'Fine1LlDoItMyself' // Fine, I'll Do It Myself
	| 'BurnedYourselfDidYou' // Burned Yourself, Did You?
	| 'SmellsLikeAnimalSpirit' // Smells like Animal Spirit!
	| 'CoreBreakthrough' // Core Breakthrough
	| 'CouldAllUninvolvedMachineryPleaseLeaveImmediately' // Could All Uninvolved Machinery Please Leave Immediately?
	| 'FightFireWithFire' // Fight Fire With Fire
	| 'RideTheLightning' // Ride the Lightning
	| '1HearThunder' // I Hear Thunder...
	| 'DryClean' // Dry Clean
	| 'Bio-OceanicWeapon' // Bio-Oceanic Weapon
	| 'LoveAndNon-Communication' // Love and Non-Communication
	| 'ThunderFall' // Thunder Fall
	| 'IcyRiversCrimsonWitch' // Icy Rivers, Crimson Witch
	| 'InugamisEnd' // Inugami's End
	| 'HardLanding' // Hard Landing
	| 'ImpeccableJudgment' // Impeccable Judgment
	| 'BewareOfAngryDog' // Beware of Angry Dog
	| 'BasicallyHarmless' // Basically Harmless
	| 'OverflowingLight' // Overflowing Light
	| 'HanAlwaysShootsFirst' // "Han Always Shoots First..."
	| 'OpportunisticGain' // Opportunistic Gain
	| 'GetOverHere' // "Get Over Here!"
	| 'WhenAutumnAndDewMeet' // When Autumn and Dew Meet
	| 'ThreeStrikes' // Three Strikes
	| 'StopItMrRobot' // Stop It, Mr. Robot!
	| 'NanomachinesSon' // Nanomachines, Son!
	| 'EstablishingABeachhead' // Establishing a Beachhead
	| 'TheInvisibleHand' // The Invisible Hand
	| 'TheMarvelousUsesOfNitrogenFixation' // The Marvelous Uses of Nitrogen Fixation
	| 'RecordsOfTheFall' // Records of the Fall
	| 'ItAllComesTumblingDown' // It All Comes Tumbling Down
	| 'CausalityOfBirthAndExtinction' // Causality of Birth and Extinction
	| 'HeWhoControlsTheSpice' // He Who Controls the Spice...
	| 'WhenYouSayNothingAtAll' // When You Say Nothing at All
	| 'TheWhitePathBetweenTwoRivers' // The White Path Between Two Rivers
	| 'CellSplinter' // Cell, Splinter
	| 'TooHotToHandle' // Too Hot to Handle!
	| 'FuneraryStorm' // Funerary Storm
	| 'IceboundOath' // Icebound Oath
	| 'TheKingIsDeadLongLiveTheKing' // The King Is Dead, Long Live the King!
	| 'Many-As-One' // Many-as-One
	| 'TheHitchhikersGuideToTheGalaxy' // The Hitchhiker's Guide to the Galaxy
	| 'APulseOfIceAndWind' // A Pulse of Ice and Wind
	| 'TheEndOfTheBeginning' // The End of the Beginning
	| 'TheOutlanderWhoCaughtTheWind' // The Outlander Who Caught the Wind
	| 'ForATomorrowWithoutTears' // For a Tomorrow Without Tears
	| 'SongOfTheDragonAndFreedom' // Song of the Dragon and Freedom
	| 'LetTheWindLead' // Let the Wind Lead
	| 'OrANewStorm' // ...Or a New Storm?
	| 'KnighthoodExcellence' // Knighthood Excellence
	| 'KnightsAndTheirKnottyIssues' // Knights and Their Knotty Issues
	| 'WindsChangeTheirCourse' // Winds Change Their Course
	| 'OfTheLandAmidstMonoliths' // Of the Land Amidst Monoliths
	| 'FarewellArchaicLord' // Farewell, Archaic Lord
	| 'OutlandishBehavior' // Outlandish Behavior
	| 'Silly-BillyChurlishGhoul' // Silly-Billy Churlish Ghoul
	| 'ThatSmellsDivine' // That Smells Divine
	| 'ItsBiggerOnTheInside' // It's Bigger on the Inside
	| 'TickedTackedAndTowed' // Ticked, Tacked, and Towed
	| 'RespectingCulturalHeritage' // Respecting Cultural Heritage
	| 'TheLongGoodbye' // The Long Goodbye
	| 'IcingOnTheSlime' // Icing on the Slime
	| 'SkysTheLimit' // Sky's the Limit
	| 'LilyLovesMusic' // Lily Loves Music
	| '1LlLetYouOffThisTime' // I'll Let You Off... This Time
	| 'Derailed' // Derailed
	| 'FinalFarewell' // Final Farewell
	| 'ANewStarApproaches' // A New Star Approaches
	| 'PiratesArgh' // Pirates! Argh!
	| 'ANourishingFriendship' // A Nourishing Friendship
	| 'LoveIsAllAround' // Love Is All Around
	| 'ForTheLoveOfGodwin' // For the Love of Godwin
	| 'LevelUp' // Level Up
	| 'BeginnersLuck' // Beginner's Luck
	| 'TakingResponsibilityForYourActions' // Taking Responsibility for Your Actions
	| 'MakingDo' // Making Do
	| 'DearDaddy' // "Dear Daddy..."
	| 'MarvelousMedicine' // Marvelous Medicine
	| 'InTheNameOfFavonius' // In the Name of Favonius
	| 'ScholarlyPretensions' // Scholarly Pretensions
	| 'PoetVsPaycheck' // Poet Vs. Paycheck
	| 'AllsWellThatEndsWell' // All's Well That Ends Well
	| 'ThisNovelIsAmazing' // This Novel Is Amazing!
	| 'OpenToInterpretation' // Open to Interpretation
	| 'GetYourOwnEmergencyFood' // Get Your Own Emergency Food!
	| 'HiddenInPlainSight' // Hidden in Plain Sight
	| 'IsThereButOneTruth' // Is There But One Truth...?
	| 'LiyueIchiban' // Liyue Ichiban
	| 'BoomShaka-LakaMoreBoom-Shaka-Laka' // Boom Shaka-Laka, More Boom-Shaka-Laka
	| 'MealForTwo' // Meal For Two
	| 'AQuestionOfDiet' // A Question of Diet
	| 'Samurice' // Samurice
	| 'SorryForTheTrouble' // "Sorry for the Trouble!"
	| 'SamuraiGourmet' // Samurai Gourmet
	| 'HelloAnyoneInHere' // Hello...! Anyone in here...?
	| 'EditorialOpinion' // Editorial Opinion
	| 'YouShouldStartADoushinDojo' // You Should Start A Doushin Dojo
	| 'GuessWho' // Guess Who?
	| 'WellAtLeastItEnded' // Well, At Least It Ended
	| 'HerAndHerCat' // Her and Her Cat
	| 'AhaWhatsOnTheHook' // Aha! What's on the Hook?
	| 'KalimisFungus' // Kalimi's Fungus
	| 'WhenWealthComesA-Knockin' // When Wealth Comes A-Knockin'
	| 'CatchMe-OwIfYouCan' // Catch Me-ow if You Can!
	| 'PrincipiaArithmetica' // Principia Arithmetica
	| 'ItsMyJob' // "It's My Job."
	| 'RelaxationTherapy' // Relaxation Therapy
	| 'UpByTheRoots' // Up by the Roots
	| 'DateOfDeparture' // Date of Departure
	| 'DontBlameTheMora' // Don't Blame the Mora!
	| 'TheSkyIsVast;TheEarth' // The Sky is Vast; The Earth...
	| 'AnswerTime' // Answer Time
	| 'TheRandomCircumstancesOfARosesBlooming' // The Random Circumstances of a Rose's Blooming
	| 'WhereHaveYouGoneMyDream' // Where Have You Gone, My Dream?
	| 'Non-ObligatoryRequest' // Non-Obligatory Request
	| 'TheShipHasIt' // The Ship Has It
	| 'WhatsTheMatter' // What's the Matter?
	| 'ScholarlyInSumeru' // Scholarly in Sumeru
	| 'OneStepTooFar' // One Step Too Far
	| 'DoctorsHandwriting' // Doctor's Handwriting
	| 'ALingeringFragrance' // A Lingering Fragrance
	| 'Swordseeker' // Swordseeker
	| 'ToWalkTheHorizon' // To Walk The Horizon...?
	| 'OfficeOnTheAvenue' // Office on the Avenue
	| 'NotYourAverageJoe' // Not Your Average Joe
	| 'AestheticCritique' // Aesthetic Critique
	| 'SecondChildhood' // Second Childhood
	| 'ASuddenSquall' // A Sudden Squall
	| 'NewInspirationNewProducts' // New Inspiration! New Products!
	| 'WhoTellsYouTheTruth' // Who Tells You the Truth?
	| 'TheConformist' // The Conformist
	| 'NothingToLoseButTime' // Nothing to Lose But Time
	| 'InterviewWithABygoneGod' // Interview With a Bygone God
	| 'CrouchingDragonHiddenChi' // Crouching Dragon, Hidden Chi
	| 'ScourgeOfTheBattlefield' // Scourge of the Battlefield
	| 'ShadowOverLuhuaPool' // Shadow Over Luhua Pool
	| 'ReadyPlayerZero' // Ready Player Zero
	| 'TreesShouldBlendTheirRootsAndShadeForThatIsWhereTheHomeIsMade' // Trees Should Blend Their Roots and Shade, for That Is Where the Home Is Made
	| 'GearsOfDestiny' // Gears of Destiny
	| 'TheBanditTheLunaticAndThePitch-BlackEnigma' // The Bandit, the Lunatic, and the Pitch-Black Enigma
	| 'WhereFateComesToACrossroads' // Where Fate Comes to a Crossroads
	| 'SneeringAtThePowerOfTheGods' // Sneering at the Power of the Gods
	| 'SilenceYouRavingLunatic' // Silence, You Raving Lunatic
	| 'WeWillBeReunited' // We Will Be Reunited
	| 'TheGatheringStorm' // The Gathering Storm
	| 'ReadyFight' // Ready, Fight!
	| 'AutumnWindsScarletLeaves' // Autumn Winds, Scarlet Leaves
	| 'ThroughTheStorm' // Through the Storm
	| 'HiiragiSanjuuro' // Hiiragi Sanjuuro
	| 'TheAspirationsOfAll' // The Aspirations of All
	| 'ThePrincessBehindTheCurtain' // The Princess Behind the Curtain
	| 'OmamoriJusticeNumberOne' // Omamori, Justice, Number One
	| 'JailhouseFiesta' // Jailhouse Fiesta
	| 'ToBraveTheLightningsGlow' // To Brave the Lightning's Glow
	| 'RevolutionaryOutlander' // Revolutionary Outlander
	| 'TheImmovableGodAndTheEternalEuthymia' // The Immovable God and the Eternal Euthymia
	| 'StillnessTheSublimationOfShadow' // Stillness, the Sublimation of Shadow
	| 'Swordfish2' // SWORDFISH II
	| 'ThoughTheirWishesBeLikeMorningDew' // Though Their Wishes Be Like Morning Dew...
	| 'FantabulousFireworkFiesta' // Fantabulous Firework Fiesta
	| 'DuelBeforeTheThrone' // Duel Before the Throne
	| 'TheirWishes' // Their Wishes
	| 'OmnipresenceOverMortals' // Omnipresence Over Mortals
	| 'AllIsWell' // "All Is Well"
	| 'AnnasAdventures' // Anna's Adventures
	| 'PreludeToTheJourney' // Prelude to the Journey
	| 'RiseOfTheJadeChamber' // Rise of the Jade Chamber
	| 'MajestyOfTheDeep' // Majesty of the Deep
	| 'AFormerDream' // A Former Dream
	| 'TheCraneReturnsOnTheWind' // The Crane Returns on the Wind
	| 'WhenOneGazesIntoTheAbyss' // When One Gazes Into the Abyss...
	| 'TheBeautifulAndDamned' // The Beautiful and Damned
	| 'TheWillToLiveAndTheDepthsOfLamentation' // The Will to Live and the Depths of Lamentation
	| 'MayGloryGoWithYou' // May Glory Go With You
	| 'NoWayHome' // No Way Home
	| 'LayersOfFear' // Layers of Fear
	| 'OfHeartAndSoul' // Of Heart and Soul
	| 'VoiceOfAkasha' // Voice of Akasha
	| 'TheMerchantAndTheGateOfKnowledge' // The Merchant and the Gate of Knowledge
	| 'TheHouseOfCannedTime' // The House of Canned Time
	| 'ThroughMistsOfSmokeAndForestsDark' // Through Mists of Smoke and Forests Dark
	| 'TheFlavorOfDéjàVu' // The Flavor of Déjà Vu
	| 'EvenPaimonWouldntEatThat' // Even Paimon Wouldn't Eat That!
	| 'AllDreamsMustEndWithAnAwakening' // All Dreams Must End With an Awakening
	| 'TheMornAThousandRosesBrings' // The Morn a Thousand Roses Brings
	| 'TheSoulTransposed' // The Soul Transposed
	| 'TriumphOfTheImagination' // Triumph of the Imagination
	| 'TheGodGazesBack' // The God Gazes Back
	| 'DreamsEmptinessDeception' // Dreams, Emptiness, Deception
	| 'DesertRaider' // Desert Raider
	| 'WhenTheDarkSunPasses' // When the Dark Sun Passes
	| 'KingDeshretAndTheThreeMagi' // King Deshret and the Three Magi
	| 'EremitisNeCredite' // Eremitis ne credite
	| 'VictoryRoad' // Victory Road
	| 'TheLongestDay' // The Longest Day
	| '1MSorrySirButYoureIneligible' // ...I'm Sorry, Sir, But You're Ineligible
	| 'AkashaPulsesTheKalpaFlameRises' // Akasha Pulses, the Kalpa Flame Rises
	| 'MysteryOfTatarasuna' // Mystery of Tatarasuna
	| 'EchoesOfHistory' // Echoes of History
	| 'ParinamaFoxCatBirdAndMonster' // Parinama: Fox, Cat, Bird, and Monster
	| 'MeMyselfButNot1' // Me, Myself, But Not I
	| 'InversionOfGenesis' // Inversion of Genesis
	| 'Star-CrossedNight' // Star-Crossed Night
	| 'TheSicknessUntoNear-Death' // The Sickness Unto Near-Death
	| 'TheFarSideOfFate' // The Far Side of Fate
	| 'Caribert' // Caribert
	| 'LikeWaterDisappearingIntoWater' // Like Water Disappearing Into Water
	| 'ADetectiveInAction' // A Detective in Action
	| 'ATwistOfGreatMagic' // A Twist of Great Magic
	| 'PreludeOfBlancheurAndNoirceur' // Prelude of Blancheur and Noirceur
	| 'LennékÉnFolyóvíz' // Lennék én folyóvíz
	| 'OnceUponATimeInFleuveCendre' // Once Upon a Time in Fleuve Cendre
	| 'TragedyRepeatsItself' // Tragedy Repeats Itself
	| 'AsLightRainFallsWithoutReason' // As Light Rain Falls Without Reason
	| 'VisitorToTheAquarium' // Visitor to the "Aquarium"
	| 'AVisionInADream' // A Vision in a Dream
	| 'FortressCornerSocietysRules' // Fortress Corner Society's Rules
	| 'ToTheStarsShiningInTheDepths' // To the Stars Shining in the Depths
	| 'LeDéluge' // Le Déluge
	| 'TheSecretOfBlueWater' // The Secret of Blue Water
	| 'OutOfTheAeons' // Out of the Aeons
	| 'CataclysmsQuickening' // Cataclysm's Quickening
	| 'TheGullsOnceWept' // The Gulls Once Wept
	| 'LoveIsDestructive' // Love is Destructive
	| 'TheStageOfFate' // The Stage of Fate
	| 'ForABetterTomorrow' // For a Better Tomorrow
	| 'MasqueradeOfTheGuilty' // Masquerade of the Guilty
	| 'TheWindAndTheStarTraveler' // The Wind and The Star Traveler
	| 'OfMountainsHigh' // Of Mountains High
	| 'TheVoiceOfFlowingWater' // The Voice of Flowing Water
	| 'TheDivineHalberdMocksTheHeavens' // The Divine Halberd Mocks the Heavens
	| 'TheDrunkardAndTheWolf' // The Drunkard and the Wolf
	| 'SpringWhiteHorseAndMoonlight' // Spring, White Horse and Moonlight
	| 'TakingShape' // Taking Shape
	| 'SurvivalExpert1' // Survival Expert 1
	| 'SurvivalExpert2' // Survival Expert 2
	| 'SurvivalExpert3' // Survival Expert 3
	| 'StarChef1' // Star Chef 1
	| 'StarChef2' // Star Chef 2
	| 'StarChef3' // Star Chef 3
	| 'OnwardAndUpward1' // Onward and Upward 1
	| 'OnwardAndUpward2' // Onward and Upward 2
	| 'OnwardAndUpward3' // Onward and Upward 3
	| 'Re-ArmedRe-Forged1' // Re-Armed, Re-Forged 1
	| 'Re-ArmedRe-Forged2' // Re-Armed, Re-Forged 2
	| 'Re-ArmedRe-Forged3' // Re-Armed, Re-Forged 3
	| 'HithertoUnknown1' // Hitherto Unknown 1
	| 'HithertoUnknown2' // Hitherto Unknown 2
	| 'HithertoUnknown3' // Hitherto Unknown 3
	| 'BountyOfTheEarth1' // Bounty of the Earth 1
	| 'BountyOfTheEarth2' // Bounty of the Earth 2
	| 'BountyOfTheEarth3' // Bounty of the Earth 3
	| 'HerosGift' // Hero's Gift
	| 'EchoingSong' // Echoing Song
	| 'LegendaryTreasure' // Legendary Treasure
	| 'SacredCanto' // Sacred Canto
	| 'ContinentalExplorerMondstadt' // Continental Explorer: Mondstadt
	| 'BrushOfAThousandWinds' // Brush of a Thousand Winds
	| 'LetTheWindLead' // Let the Wind Lead
	| 'SanctuaryPilgrimMondstadt' // Sanctuary Pilgrim: Mondstadt
	| 'GuidingWind1' // Guiding Wind 1
	| 'GuidingWind2' // Guiding Wind 2
	| 'GuidingWind3' // Guiding Wind 3
	| 'Wind-ChasingTreasureHunter1' // Wind-Chasing Treasure Hunter 1
	| 'Wind-ChasingTreasureHunter2' // Wind-Chasing Treasure Hunter 2
	| 'Wind-ChasingTreasureHunter3' // Wind-Chasing Treasure Hunter 3
	| 'Wind-ChasingAdventurer1' // Wind-Chasing Adventurer 1
	| 'Wind-ChasingAdventurer2' // Wind-Chasing Adventurer 2
	| 'Wind-ChasingAdventurer3' // Wind-Chasing Adventurer 3
	| 'ContinentalExplorerLiyue' // Continental Explorer: Liyue
	| 'SurveyorOfStone' // Surveyor of Stone
	| 'UnmovableMountain' // Unmovable Mountain
	| 'SanctuaryPilgrimLiyue' // Sanctuary Pilgrim: Liyue
	| 'LithicGuide1' // Lithic Guide 1
	| 'LithicGuide2' // Lithic Guide 2
	| 'LithicGuide3' // Lithic Guide 3
	| 'Rock-SteadyTreasureHunter1' // Rock-Steady Treasure Hunter 1
	| 'Rock-SteadyTreasureHunter2' // Rock-Steady Treasure Hunter 2
	| 'Rock-SteadyTreasureHunter3' // Rock-Steady Treasure Hunter 3
	| 'Rock-SteadyAdventurer1' // Rock-Steady Adventurer 1
	| 'Rock-SteadyAdventurer2' // Rock-Steady Adventurer 2
	| 'Rock-SteadyAdventurer3' // Rock-Steady Adventurer 3
	| 'CoolIt1' // Cool It! 1
	| 'CoolIt2' // Cool It! 2
	| 'CoolIt3' // Cool It! 3
	| 'GoWithTheWind1' // Go With the Wind! 1
	| 'GoWithTheWind2' // Go With the Wind! 2
	| 'GoWithTheWind3' // Go With the Wind! 3
	| 'SeasonsGreetings1' // Season's Greetings 1
	| 'SeasonsGreetings2' // Season's Greetings 2
	| 'SeasonsGreetings3' // Season's Greetings 3
	| 'PerformanceMayDeclineInLowTemperatures1' // Performance May Decline in Low Temperatures 1
	| 'PerformanceMayDeclineInLowTemperatures2' // Performance May Decline in Low Temperatures 2
	| 'PerformanceMayDeclineInLowTemperatures3' // Performance May Decline in Low Temperatures 3
	| 'TheArtOfWar1' // The Art of War 1
	| 'TheArtOfWar2' // The Art of War 2
	| 'TheArtOfWar3' // The Art of War 3
	| 'MeltYouDownLikeIceCream1' // Melt You Down Like Ice Cream 1
	| 'MeltYouDownLikeIceCream2' // Melt You Down Like Ice Cream 2
	| 'MeltYouDownLikeIceCream3' // Melt You Down Like Ice Cream 3
	| 'ALittleLessShockingThanLoveAtFirstSight1' // A Little Less Shocking Than Love at First Sight 1
	| 'ALittleLessShockingThanLoveAtFirstSight2' // A Little Less Shocking Than Love at First Sight 2
	| 'ALittleLessShockingThanLoveAtFirstSight3' // A Little Less Shocking Than Love at First Sight 3
	| 'NothingSpecialJustPractice' // Nothing Special, Just Practice
	| 'MasterSniper' // Master Sniper
	| 'DerFreischütz' // Der Freischütz
	| 'FullMetalWhatNow' // Full Metal What Now?
	| 'ArePlasmaGlobesStillInFashion' // Are Plasma Globes Still in Fashion?
	| 'RhythmTengoku' // Rhythm Tengoku
	| 'BlazingDadaupa' // Blazing Dadaupa
	| 'DownWeGo1' // Down We Go 1
	| 'DownWeGo2' // Down We Go 2
	| 'DownWeGo3' // Down We Go 3
	| 'DownToDodge1' // Down to Dodge 1
	| 'DownToDodge2' // Down to Dodge 2
	| 'DownToDodge3' // Down to Dodge 3
	| 'MyPrecious' // My Precious
	| 'AbyssalCrusader' // Abyssal Crusader
	| 'Odomu' // ...Odomu?
	| 'YoDala' // Yo dala?
	| 'Perfectionist' // Perfectionist
	| 'TellingItHowItIs' // Telling It How It Is
	| 'GeoArchonAnecdotes' // Geo Archon Anecdotes
	| 'FriendsTravelersLendMeYourEars' // Friends, Travelers, Lend Me Your Ears...
	| 'OnceUponATime' // Once Upon a Time...
	| 'YouCameYouSawWeCo-Oped1' // You Came, You Saw, We Co-Oped 1
	| 'YouCameYouSawWeCo-Oped2' // You Came, You Saw, We Co-Oped 2
	| 'YouCameYouSawWeCo-Oped3' // You Came, You Saw, We Co-Oped 3
	| '1Came1Saw1Conquered1' // I Came, I Saw, I Conquered 1
	| '1Came1Saw1Conquered2' // I Came, I Saw, I Conquered 2
	| '1Came1Saw1Conquered3' // I Came, I Saw, I Conquered 3
	| 'ThatsOneBigCrystalfly' // That's One Big Crystalfly
	| 'AndStillSmiling' // ...And Still Smiling!
	| 'YouHaveToHitThePillars' // You Have to Hit the Pillars
	| 'JustMeAndYouTheSkySoBlueAndAlmostGettingKilledByACryoRegisvine' // Just Me and You, the Sky So Blue, and Almost Getting Killed by a Cryo Regisvine
	| 'ThisIsFine' // This Is Fine
	| 'AFishCalledRhodeia' // A Fish Called Rhodeia
	| 'WolfPact' // Wolf Pact
	| 'HydroHunter' // Hydro Hunter
	| 'DipDuckDiveDodgeDefeat' // Dip, Duck, Dive, Dodge, Defeat
	| 'WellThatWasStrange1' // ...Well, That Was Strange 1
	| 'WellThatWasStrange2' // ...Well, That Was Strange 2
	| 'WellThatWasStrange3' // ...Well, That Was Strange 3
	| 'ExtremeGardening' // Extreme Gardening
	| 'GardenerExtraordinaire' // Gardener Extraordinaire
	| 'Geronimo' // Geronimo!
	| 'ViciousCircle' // Vicious Circle
	| 'ShieldMeFromTheWorld' // Shield Me From the World
	| 'Turnover' // Turnover
	| 'TearDownThisWall' // Tear Down This Wall!
	| 'NoIceForMeThanks' // No Ice for Me, Thanks
	| 'TheHarderTheyFall' // ...The Harder They Fall
	| 'Chilly-Churl' // Chilly-Churl
	| 'Rosebud' // "Rosebud..."
	| 'AssassinOfKings' // Assassin of Kings
	| 'DavidAndGoliath' // David and Goliath
	| 'ContinentalExplorerDragonspine' // Continental Explorer: Dragonspine
	| 'PeakHopper' // Peak Hopper
	| 'SeelieInTheSnow1' // Seelie in the Snow 1
	| 'SeelieInTheSnow2' // Seelie in the Snow 2
	| 'SeelieInTheSnow3' // Seelie in the Snow 3
	| 'MountainOfTreasure1' // Mountain of Treasure 1
	| 'MountainOfTreasure2' // Mountain of Treasure 2
	| 'MountainOfTreasure3' // Mountain of Treasure 3
	| 'ScarletSprouts1' // Scarlet Sprouts 1
	| 'ScarletSprouts2' // Scarlet Sprouts 2
	| 'ScarletSprouts3' // Scarlet Sprouts 3
	| 'SkyfrostNail' // Skyfrost Nail
	| 'Dragonspear' // Dragonspear
	| 'FantasticVoyagePrologue' // Fantastic Voyage: Prologue
	| 'ArchaicLordOfLightningAndBlitz' // Archaic Lord of Lightning and Blitz
	| 'ThePowerOfLuck' // The Power of Luck
	| 'EvilIsBanished' // Evil Is Banished
	| 'BeholdMineEvil-EspyingEye' // Behold, Mine Evil-Espying Eye!
	| 'RedHotChiliPopsicles' // Red Hot Chili Popsicles
	| 'ALineThatMayBeCrossed' // A Line That May Be Crossed
	| 'AnIdolsLastLineOfDefense' // An Idol's Last Line of Defense
	| 'MondstadtsSpiciestSurprise' // Mondstadt's Spiciest Surprise
	| 'AMaidOfStrengthAndVirtue' // A Maid of Strength and Virtue
	| 'For1AmDutyBound' // "...For I Am Duty Bound"
	| 'AWorldKnownOnlyUntoRoses' // A World Known Only Unto Roses
	| 'StressRelief' // Stress Relief
	| 'InvulnerableMaid-Knight' // Invulnerable Maid-Knight
	| 'MondstadtsNote-TakerGeneral' // Mondstadt's Note-Taker General
	| 'DionaSpecialStirredNotShaken' // Diona Special, Stirred, Not Shaken
	| 'ButTheresACatch' // But There's a Catch...
	| 'KittenQueen' // Kitten Queen
	| 'EveryonesHappy' // Everyone's Happy
	| 'HousekeeperExtraordinaire' // Housekeeper Extraordinaire
	| 'FromTheSeaNeverReturning' // From the Sea Never Returning
	| 'TallerByHalf' // Taller by Half
	| 'Mujina-ClassNinja' // Mujina-Class Ninja
	| 'DishEffectMobilityDecreased' // Dish Effect: Mobility Decreased
	| 'GeneralOfWatatsumi' // General of Watatsumi
	| 'ChangingTimes' // Changing Times
	| 'ToTellOrNotToTellThatIsTheQuestion' // To Tell or Not to Tell, That Is the Question
	| 'HonoraryCruxMember' // Honorary Crux Member
	| 'WineUnburdens' // Wine Unburdens
	| 'GuyunBuyersClub' // Guyun Buyers' Club
	| 'MegrezsCompanionStar' // Megrez's Companion Star
	| 'YouveGotToHaveReserves' // You've Got to Have Reserves
	| 'Overprotectiveness' // Overprotectiveness
	| 'TheLingeringSong' // The Lingering Song
	| 'MayThisMomentBeMadeToLast' // May This Moment Be Made to Last
	| 'AStrictMasterTrainsATalentedPupil' // A Strict Master Trains a Talented Pupil
	| 'AratakiGangChiefAdvisor' // Arataki Gang Chief Advisor
	| 'OneMoreLook' // One More Look!
	| 'Upstairs' // "Upstairs..."
	| 'YouThoughtWeWereForRealEh' // You Thought We Were For Real, Eh?
	| 'AnIdealDetectiveAm1' // An Ideal Detective Am I
	| 'SangonomiyaSupplications' // Sangonomiya Supplications
	| 'OptimalSolution' // Optimal Solution
	| 'ToYouInAHundredYears' // To You in a Hundred Years
	| 'MechanicsFromBeginnerTo' // Mechanics: From Beginner to...?
	| 'TheNameIsLayla' // The Name Is Layla
	| 'ShesAlreadyTense' // She's Already Tense
	| 'SecretOfSeelieAndTheStar-LitSky' // Secret of Seelie and the Star-Lit Sky
	| 'ArtAndLife' // Art and Life
	| 'SchoolDays' // School Days
	| 'AnArchitectsRomanticism' // An Architect's Romanticism
	| 'MakeMerry' // Make Merry
	| 'LuckyCoin' // Lucky Coin
	| 'ShhListen' // Shh... Listen!
	| 'RealmSansFrontières' // Realm Sans Frontières
	| 'HighAdeptalEnergyReadingsAhead1' // High Adeptal Energy Readings Ahead 1
	| 'HighAdeptalEnergyReadingsAhead2' // High Adeptal Energy Readings Ahead 2
	| 'HighAdeptalEnergyReadingsAhead3' // High Adeptal Energy Readings Ahead 3
	| 'FriendOfTheRealm1' // Friend of the Realm 1
	| 'FriendOfTheRealm2' // Friend of the Realm 2
	| 'FriendOfTheRealm3' // Friend of the Realm 3
	| 'T—T—T—Timberhochwandi1' // T—T—T—Timberhochwandi 1
	| 'T—T—T—Timberhochwandi2' // T—T—T—Timberhochwandi 2
	| 'T—T—T—Timberhochwandi3' // T—T—T—Timberhochwandi 3
	| 'If1WereARichMan1' // If I Were a Rich Man 1
	| 'If1WereARichMan2' // If I Were a Rich Man 2
	| 'If1WereARichMan3' // If I Were a Rich Man 3
	| 'NotJustASmallBench1' // Not Just a Small Bench 1
	| 'NotJustASmallBench2' // Not Just a Small Bench 2
	| 'NotJustASmallBench3' // Not Just a Small Bench 3
	| 'ColorItIn1' // Color It In 1
	| 'ColorItIn2' // Color It In 2
	| 'ColorItIn3' // Color It In 3
	| 'PrecisionModeling1' // Precision Modeling 1
	| 'PrecisionModeling2' // Precision Modeling 2
	| 'PrecisionModeling3' // Precision Modeling 3
	| 'MyTerritory1' // My... Territory 1
	| 'MyTerritory2' // My... Territory 2
	| 'MyTerritory3' // My... Territory 3
	| 'HonoredGuestOfTheRealm' // Honored Guest of the Realm
	| 'FiresideChats1' // Fireside Chats 1
	| 'FiresideChats2' // Fireside Chats 2
	| 'FiresideChats3' // Fireside Chats 3
	| 'GiftsAllAround1' // Gifts All Around 1
	| 'GiftsAllAround2' // Gifts All Around 2
	| 'GiftsAllAround3' // Gifts All Around 3
	| 'GeovishapSolarvishapLunarvishap' // ...Geovishap, Solarvishap, Lunarvishap...
	| 'GeoElementalReaction' // Geo Elemental Reaction?
	| 'PuppetShow-Off' // Puppet Show-Off
	| 'TotaledTotem' // Totaled Totem
	| 'DidMyHandFallFromMyWrist' // Did My Hand Fall From My Wrist?
	| '1LlSkipTheSpaThanks' // I'll Skip the Spa, Thanks
	| 'ItsQuietTooQuiet' // It's Quiet... Too Quiet...
	| 'TheBattleOfNarukamiIsland' // The Battle of Narukami Island
	| 'TheFinishingTouch' // The Finishing Touch
	| 'ADelusionsAbilitiesDontDecideABattlesOutcome' // A Delusion's Abilities Don't Decide a Battle's Outcome
	| 'MovingMountains' // Moving Mountains
	| 'BlastFromThePast' // Blast From the Past
	| 'PutOnIce' // Put on Ice
	| 'NoStringsAttachedAnymore' // No Strings Attached, Anymore
	| 'OperationBonfire' // Operation Bonfire
	| 'TheNot-So-PerpetualMechanicalArray' // The Not-So-Perpetual Mechanical Array
	| 'UnlimitedPower' // Unlimited Power!
	| 'LandOfDandelions' // Land of Dandelions
	| 'TrueFriendshipTakesSacrifice' // True Friendship Takes Sacrifice
	| 'EternalYouth' // Eternal Youth
	| 'HilichurlianStudiesExpert' // Hilichurlian Studies Expert
	| 'JustLikeAGameOfChess' // Just Like a Game of Chess
	| 'WereGoingToNeedMoreCrops1' // We're Going to Need More Crops! 1
	| 'WereGoingToNeedMoreCrops2' // We're Going to Need More Crops! 2
	| 'WereGoingToNeedMoreCrops3' // We're Going to Need More Crops! 3
	| 'MyBloomingAbode1' // My Blooming Abode 1
	| 'MyBloomingAbode2' // My Blooming Abode 2
	| 'MyBloomingAbode3' // My Blooming Abode 3
	| 'StopGatherTime1' // Stop! Gather Time. 1
	| 'StopGatherTime2' // Stop! Gather Time. 2
	| 'StopGatherTime3' // Stop! Gather Time. 3
	| 'ContinentalExplorerLandOfSurgingThunder(1)' // Continental Explorer: Land of Surging Thunder (I)
	| 'ThunderboltingAcrossTheLand(1)' // Thunderbolting Across the Land (I)
	| 'SanctuaryPilgrimInazumaTenryou(1)' // Sanctuary Pilgrim: Inazuma Tenryou (I)
	| 'EternalThunder' // Eternal Thunder
	| 'DivineRoots' // Divine Roots
	| 'NakuWeedWhacker(1)1' // Naku Weed Whacker (I) 1
	| 'NakuWeedWhacker(1)2' // Naku Weed Whacker (I) 2
	| 'NakuWeedWhacker(1)3' // Naku Weed Whacker (I) 3
	| 'LightsWillGuideYouHome(1)1' // Lights Will Guide You Home (I) 1
	| 'LightsWillGuideYouHome(1)2' // Lights Will Guide You Home (I) 2
	| 'LightsWillGuideYouHome(1)3' // Lights Will Guide You Home (I) 3
	| 'Lightning-RidingTreasureHunter(1)1' // Lightning-Riding Treasure Hunter (I) 1
	| 'Lightning-RidingTreasureHunter(1)2' // Lightning-Riding Treasure Hunter (I) 2
	| 'Lightning-RidingTreasureHunter(1)3' // Lightning-Riding Treasure Hunter (I) 3
	| 'SpringCleaning' // Spring Cleaning
	| 'TataraTales' // Tatara Tales
	| 'EchoOfFury' // Echo of Fury
	| 'Lightning-RidingAdventurer(1)1' // Lightning-Riding Adventurer (I) 1
	| 'Lightning-RidingAdventurer(1)2' // Lightning-Riding Adventurer (I) 2
	| 'Lightning-RidingAdventurer(1)3' // Lightning-Riding Adventurer (I) 3
	| 'AmateursHammerNailsIntoHooks' // Amateurs Hammer Nails Into Hooks
	| 'DoYouNeedAFishtankToGoWithThat' // "Do you need a fishtank to go with that?"
	| 'YonMirrordMoonBroken' // Yon Mirror'd Moon, Broken
	| 'DingDingDing1' // Ding Ding Ding! 1
	| 'DingDingDing2' // Ding Ding Ding! 2
	| 'DingDingDing3' // Ding Ding Ding! 3
	| 'CallMeIshmael' // "Call Me Ishmael."
	| 'FishyMotive' // Fishy Motive
	| 'IntoTheWaters' // Into the Waters
	| 'ARightProperAngler' // A Right Proper Angler
	| 'Intermission' // Intermission
	| 'Stabilizer' // Stabilizer
	| 'ContinentalExplorerLandOfSurgingThunder(2)' // Continental Explorer: Land of Surging Thunder (II)
	| 'ThunderboltingAcrossTheLand(2)' // Thunderbolting Across the Land (II)
	| 'SanctuaryPilgrimInazumaTenryou(2)' // Sanctuary Pilgrim: Inazuma Tenryou (II)
	| 'NakuWeedWhacker(2)1' // Naku Weed Whacker (II) 1
	| 'NakuWeedWhacker(2)2' // Naku Weed Whacker (II) 2
	| 'NakuWeedWhacker(2)3' // Naku Weed Whacker (II) 3
	| 'LightsWillGuideYouHome(2)' // Lights Will Guide You Home (II)
	| 'Lightning-RidingTreasureHunter(2)1' // Lightning-Riding Treasure Hunter (II) 1
	| 'Lightning-RidingTreasureHunter(2)2' // Lightning-Riding Treasure Hunter (II) 2
	| 'Lightning-RidingTreasureHunter(2)3' // Lightning-Riding Treasure Hunter (II) 3
	| 'Lightning-RidingAdventurer(2)1' // Lightning-Riding Adventurer (II) 1
	| 'Lightning-RidingAdventurer(2)2' // Lightning-Riding Adventurer (II) 2
	| 'Lightning-RidingAdventurer(2)3' // Lightning-Riding Adventurer (II) 3
	| 'SeiraiStormchasers' // Seirai Stormchasers
	| 'TheSameMoonlight' // The Same Moonlight
	| 'ContinentalExplorerTsurumiIsland' // Continental Explorer: Tsurumi Island
	| 'FogsEdge' // Fog's Edge
	| 'SanctuaryPilgrimTsurumiIsland' // Sanctuary Pilgrim: Tsurumi Island
	| 'FlashesInTheNight' // Flashes in the Night
	| 'FoggyGuidance' // Foggy Guidance
	| 'LostTreasureHunter1' // Lost Treasure Hunter 1
	| 'LostTreasureHunter2' // Lost Treasure Hunter 2
	| 'LostTreasureHunter3' // Lost Treasure Hunter 3
	| 'LostAdventurer1' // Lost Adventurer 1
	| 'LostAdventurer2' // Lost Adventurer 2
	| 'LostAdventurer3' // Lost Adventurer 3
	| 'ThunderIsForever' // Thunder Is Forever
	| 'YouDoNotKnowTheNight' // "...You Do Not Know the Night..."
	| 'TheHighestAuthorityInTheLand' // The Highest Authority in the Land
	| 'PhosphorosGuidance1' // Phosphoros' Guidance 1
	| 'PhosphorosGuidance2' // Phosphoros' Guidance 2
	| 'PhosphorosGuidance3' // Phosphoros' Guidance 3
	| 'HesperusBoons1' // Hesperus' Boons 1
	| 'HesperusBoons2' // Hesperus' Boons 2
	| 'HesperusBoons3' // Hesperus' Boons 3
	| 'KairosConstancy1' // Kairos' Constancy 1
	| 'KairosConstancy2' // Kairos' Constancy 2
	| 'KairosConstancy3' // Kairos' Constancy 3
	| 'FireRatsRobeDragon-HeadPearlSacredOfferingBowlAnd' // Fire Rat's Robe, Dragon-Head Pearl, Sacred Offering Bowl, and...
	| 'SaltForMyFoesAndWaterForMe' // Salt for My Foes, and Water for Me
	| 'TheFraughtReturn' // The Fraught Return
	| 'MomentOfDestruction' // Moment of Destruction
	| 'ElectricEscape' // Electric Escape
	| 'RadioSilence' // Radio Silence
	| 'SwimmingProhibited' // Swimming Prohibited
	| 'DeathProof' // Death Proof
	| 'Ouroboros' // Ouroboros
	| 'ChasmConqueror' // Chasm Conqueror
	| 'PerilousPlunge' // Perilous Plunge
	| 'IntoTheDepths' // Into the Depths
	| 'GorgeGuide1' // Gorge Guide 1
	| 'GorgeGuide2' // Gorge Guide 2
	| 'GorgeGuide3' // Gorge Guide 3
	| 'ChasmTreasureHunter1' // Chasm Treasure Hunter 1
	| 'ChasmTreasureHunter2' // Chasm Treasure Hunter 2
	| 'ChasmTreasureHunter3' // Chasm Treasure Hunter 3
	| 'ChasmAdventurer1' // Chasm Adventurer 1
	| 'ChasmAdventurer2' // Chasm Adventurer 2
	| 'ChasmAdventurer3' // Chasm Adventurer 3
	| 'Arch-Illuminator' // Arch-Illuminator
	| 'WhenTheSealIsBroken' // "When the Seal Is Broken..."
	| 'ExplorationUnderway' // Exploration Underway
	| 'ContinentalExplorerSumeruBoscage' // Continental Explorer: Sumeru Boscage
	| 'ForestRoamer' // Forest Roamer
	| 'SanctuaryPilgrimSumeruBoscage' // Sanctuary Pilgrim: Sumeru Boscage
	| 'FluorescentBloom' // Fluorescent Bloom
	| 'CulminationOfTheGreatDream' // Culmination of the Great Dream
	| 'WoodlandGuide1' // Woodland Guide 1
	| 'WoodlandGuide2' // Woodland Guide 2
	| 'WoodlandGuide3' // Woodland Guide 3
	| 'TreasureHunterOfTheShimmeringWoods1' // Treasure Hunter of the Shimmering Woods 1
	| 'TreasureHunterOfTheShimmeringWoods2' // Treasure Hunter of the Shimmering Woods 2
	| 'TreasureHunterOfTheShimmeringWoods3' // Treasure Hunter of the Shimmering Woods 3
	| 'AdventurerOfTheShimmeringWoods1' // Adventurer of the Shimmering Woods 1
	| 'AdventurerOfTheShimmeringWoods2' // Adventurer of the Shimmering Woods 2
	| 'AdventurerOfTheShimmeringWoods3' // Adventurer of the Shimmering Woods 3
	| 'TheForestWillRemember' // The Forest Will Remember
	| 'TheEssenceOfFlora' // The Essence of Flora
	| 'ReminiscenceOfGurabad' // Reminiscence of Gurabad
	| 'BrightAsAFlame' // Bright as a Flame
	| 'FarrisJourney' // Farris' Journey
	| 'OurHeartsAsOne' // Our Hearts as One
	| 'WaterBasically' // Water, Basically
	| 'DashingThroughTheSnowAndTheFlames' // Dashing Through the Snow... and the Flames
	| 'TheWhispererInDarkness' // The Whisperer in Darkness
	| 'BraveTheLightningsGlow' // Brave the Lightning's Glow...
	| 'SurpassingTheAncientsWisdom' // Surpassing the Ancients' Wisdom
	| '1MAFlexitarian' // I'm a Flexitarian
	| 'ElectricShockHazard' // Electric Shock Hazard
	| 'TheMadFlowerAtTheEndOfTheRoad' // The Mad Flower at the End of the Road
	| '1CantTakeItAnymore' // I Can't Take It Anymore!
	| 'TheSmellOfGrilledMushroomsInTheMorning' // The Smell of Grilled Mushrooms in the Morning
	| 'Dragonslayer' // Dragonslayer
	| 'VictoryIsAMindset' // Victory is a Mindset
	| 'ResistanceIsFutile' // Resistance is Futile!
	| 'SystemShock' // System Shock
	| 'DaisyDaisy' // Daisy, Daisy
	| 'ContinentalExplorerDuneDreams(1)' // Continental Explorer: Dune Dreams (I)
	| 'OverSandstormsAndMirages(1)' // Over Sandstorms and Mirages (I)
	| 'SanctuaryPilgrimDuneDreams(1)' // Sanctuary Pilgrim: Dune Dreams (I)
	| 'TheDesertWillGuideYouHome(1)1' // The Desert Will Guide You Home (I) 1
	| 'TheDesertWillGuideYouHome(1)2' // The Desert Will Guide You Home (I) 2
	| 'TheDesertWillGuideYouHome(1)3' // The Desert Will Guide You Home (I) 3
	| 'QuicksandTreasureHunter(1)1' // Quicksand Treasure Hunter (I) 1
	| 'QuicksandTreasureHunter(1)2' // Quicksand Treasure Hunter (I) 2
	| 'QuicksandTreasureHunter(1)3' // Quicksand Treasure Hunter (I) 3
	| 'QuicksandAdventurer(1)1' // Quicksand Adventurer (I) 1
	| 'QuicksandAdventurer(1)2' // Quicksand Adventurer (I) 2
	| 'QuicksandAdventurer(1)3' // Quicksand Adventurer (I) 3
	| 'SlumberTheBrotherOf' // Slumber, the Brother Of...
	| 'GrassyBlastySparksNSplash1' // Grassy Blasty, Sparks 'n' Splash 1
	| 'GrassyBlastySparksNSplash2' // Grassy Blasty, Sparks 'n' Splash 2
	| 'GrassyBlastySparksNSplash3' // Grassy Blasty, Sparks 'n' Splash 3
	| 'HyperbloomingCircus1' // Hyperblooming Circus 1
	| 'HyperbloomingCircus2' // Hyperblooming Circus 2
	| 'HyperbloomingCircus3' // Hyperblooming Circus 3
	| 'ActiveCamouflage' // Active Camouflage
	| 'VisibleYetInvisible' // Visible, Yet Invisible
	| 'Win-LossRatio' // Win-Loss Ratio
	| 'LegendaryHighRoller1' // Legendary High Roller 1
	| 'LegendaryHighRoller2' // Legendary High Roller 2
	| 'LegendaryHighRoller3' // Legendary High Roller 3
	| 'ARiotousResponse1' // A Riotous Response 1
	| 'ARiotousResponse2' // A Riotous Response 2
	| 'ARiotousResponse3' // A Riotous Response 3
	| 'MiniaturizedDice-Shaker1' // Miniaturized Dice-Shaker 1
	| 'MiniaturizedDice-Shaker2' // Miniaturized Dice-Shaker 2
	| 'MiniaturizedDice-Shaker3' // Miniaturized Dice-Shaker 3
	| 'VictoryAtHand1' // Victory at Hand 1
	| 'VictoryAtHand2' // Victory at Hand 2
	| 'VictoryAtHand3' // Victory at Hand 3
	| 'WellLetsSeeItPartner1' // "Well, Let's See It, Partner..." 1
	| 'WellLetsSeeItPartner2' // "Well, Let's See It, Partner..." 2
	| 'WellLetsSeeItPartner3' // "Well, Let's See It, Partner..." 3
	| 'AttackAttackAttack1' // Attack! Attack! Attack! 1
	| 'AttackAttackAttack2' // Attack! Attack! Attack! 2
	| 'AttackAttackAttack3' // Attack! Attack! Attack! 3
	| 'ACandleInTheWind1' // A Candle in the Wind? 1
	| 'ACandleInTheWind2' // A Candle in the Wind? 2
	| 'ACandleInTheWind3' // A Candle in the Wind? 3
	| 'ChaosDivided1' // Chaos Divided 1
	| 'ChaosDivided2' // Chaos Divided 2
	| 'ChaosDivided3' // Chaos Divided 3
	| 'ContinentalExplorerDuneDreams(2)' // Continental Explorer: Dune Dreams (II)
	| 'OverSandstormsAndMirages(2)' // Over Sandstorms and Mirages (II)
	| 'SanctuaryPilgrimDuneDreams(2)' // Sanctuary Pilgrim: Dune Dreams (II)
	| 'TheDesertWillGuideYouHome(2)1' // The Desert Will Guide You Home (II) 1
	| 'TheDesertWillGuideYouHome(2)2' // The Desert Will Guide You Home (II) 2
	| 'TheDesertWillGuideYouHome(2)3' // The Desert Will Guide You Home (II) 3
	| 'QuicksandTreasureHunter(2)1' // Quicksand Treasure Hunter (II) 1
	| 'QuicksandTreasureHunter(2)2' // Quicksand Treasure Hunter (II) 2
	| 'QuicksandTreasureHunter(2)3' // Quicksand Treasure Hunter (II) 3
	| 'QuicksandAdventurer(2)1' // Quicksand Adventurer (II) 1
	| 'QuicksandAdventurer(2)2' // Quicksand Adventurer (II) 2
	| 'QuicksandAdventurer(2)3' // Quicksand Adventurer (II) 3
	| 'TheDirgeOfBilqis' // The Dirge of Bilqis
	| 'RefusalOfThorns' // Refusal of Thorns
	| 'BackForMore' // Back for More
	| 'LikeHopscotch' // Like Hopscotch?
	| 'ItsPaybackTime' // ...It's Payback Time
	| 'NowThatsWhatYouCallTheFourWinds' // Now That's What You Call the Four Winds!
	| 'DespiteTheBarrierBetweenUs' // Despite the Barrier Between Us...
	| 'ProofByExhaustion' // Proof by Exhaustion
	| 'LikeTheSunsPassage' // Like the Sun's Passage
	| 'TheDistanceOfTheMoon' // The Distance of the Moon
	| 'GravityFront' // Gravity Front
	| 'ShackleMeThat1MightWillinglyBeDestroyed' // Shackle Me, That I Might Willingly Be Destroyed
	| 'CrabsForTheCrabThrone' // Crabs for the Crab Throne
	| 'CollezioneDiSabbia' // Collezione di Sabbia
	| 'FulguraFrango' // Fulgura Frango
	| 'ContinentalExplorerBlessedHamada' // Continental Explorer: Blessed Hamada
	| 'DescendingIntoTheDepthsOfDesolation' // Descending Into the Depths of Desolation
	| 'SanctuaryPilgrimBlessedHamada' // Sanctuary Pilgrim: Blessed Hamada
	| 'DuneGuide1' // Dune Guide 1
	| 'DuneGuide2' // Dune Guide 2
	| 'DuneGuide3' // Dune Guide 3
	| 'BadlandsTreasureHunter1' // Badlands Treasure Hunter 1
	| 'BadlandsTreasureHunter2' // Badlands Treasure Hunter 2
	| 'BadlandsTreasureHunter3' // Badlands Treasure Hunter 3
	| 'BadlandsAdventurer1' // Badlands Adventurer 1
	| 'BadlandsAdventurer2' // Badlands Adventurer 2
	| 'BadlandsAdventurer3' // Badlands Adventurer 3
	| 'AlkanetAmrita' // Alkanet Amrita
	| 'KhvarenaOfGoodAndEvil' // Khvarena of Good and Evil
	| 'ContinentalExplorerLandOfHarmoniousSprings(1)' // Continental Explorer: Land of Harmonious Springs (I)
	| 'FontOfAllWaters(1)' // Font of All Waters (I)
	| 'SanctuaryPilgrimLandOfHarmoniousSprings(1)' // Sanctuary Pilgrim: Land of Harmonious Springs (I)
	| 'LikeWatersClear' // Like Waters Clear
	| 'DewSong' // Dew Song
	| 'TidesWillGuideYouHome(1)1' // Tides Will Guide You Home (I) 1
	| 'TidesWillGuideYouHome(1)2' // Tides Will Guide You Home (I) 2
	| 'TidesWillGuideYouHome(1)3' // Tides Will Guide You Home (I) 3
	| 'WaveridingTreasureHunter(1)1' // Waveriding Treasure Hunter (I) 1
	| 'WaveridingTreasureHunter(1)2' // Waveriding Treasure Hunter (I) 2
	| 'WaveridingTreasureHunter(1)3' // Waveriding Treasure Hunter (I) 3
	| 'WaveridingAdventurer(1)1' // Waveriding Adventurer (I) 1
	| 'WaveridingAdventurer(1)2' // Waveriding Adventurer (I) 2
	| 'WaveridingAdventurer(1)3' // Waveriding Adventurer (I) 3
	| 'AnnInWonderland' // Ann in Wonderland
	| 'LimnerDreamerAndRoboticDog' // Limner, Dreamer, and Robotic Dog
	| 'LandOfFairSprings' // Land of Fair Springs
	| 'RenartTheDeceiver' // Renart the Deceiver
	| 'RobbenVersusChesterton' // Robben versus Chesterton
	| 'CompendiumOfMisery' // Compendium of Misery
	| 'EndOfTheEternalReturn' // End of the Eternal Return
	| 'EverSoSlightlyInferior' // Ever So Slightly Inferior
	| 'TheGreeneryOutOfSpace' // The Greenery Out of Space
	| 'DanceLikeYouWantToWin' // Dance Like You Want to Win!
	| 'Desert-DwellersRiteOfPassage' // Desert-Dwellers' Rite of Passage
	| 'PresumptionOfGuilt' // Presumption of Guilt
	| 'ProofOfTheReedSeaConqueror' // Proof of the Reed Sea Conqueror
	| 'ThePowerOfScienceIsStaggering' // The Power of Science is Staggering!
	| 'ASuccessfulHunt' // A Successful Hunt
	| 'ContinentalExplorerLandOfHarmoniousSprings(2)' // Continental Explorer: Land of Harmonious Springs (II)
	| 'FontOfAllWaters(2)' // Font of All Waters (II)
	| 'SanctuaryPilgrimLandOfHarmoniousSprings(2)' // Sanctuary Pilgrim: Land of Harmonious Springs (II)
	| 'TidalGuide(2)1' // Tidal Guide (II) 1
	| 'TidalGuide(2)2' // Tidal Guide (II) 2
	| 'TidalGuide(2)3' // Tidal Guide (II) 3
	| 'WaveridingTreasureHunter(2)1' // Waveriding Treasure Hunter (II) 1
	| 'WaveridingTreasureHunter(2)2' // Waveriding Treasure Hunter (II) 2
	| 'WaveridingTreasureHunter(2)3' // Waveriding Treasure Hunter (II) 3
	| 'WaveridingAdventurer(2)1' // Waveriding Adventurer (II) 1
	| 'WaveridingAdventurer(2)2' // Waveriding Adventurer (II) 2
	| 'WaveridingAdventurer(2)3' // Waveriding Adventurer (II) 3
	| 'ThereIsOneSpectacleGranderThanTheSeaThatIsTheSky' // There Is One Spectacle Grander Than the Sea, That Is the Sky
	| 'ThisEndsHere' // This Ends Here
	| 'ContinentalExplorerLandOfHarmoniousSprings(3)' // Continental Explorer: Land of Harmonious Springs (III)
	| 'FontOfAllWaters(3)' // Font of All Waters (III)
	| 'SanctuaryPilgrimLandOfHarmoniousSprings(3)' // Sanctuary Pilgrim: Land of Harmonious Springs (III)
	| 'TidalGuide(3)1' // Tidal Guide (III) 1
	| 'TidalGuide(3)2' // Tidal Guide (III) 2
	| 'TidalGuide(3)3' // Tidal Guide (III) 3
	| 'WaveridingTreasureHunter(3)1' // Waveriding Treasure Hunter (III) 1
	| 'WaveridingTreasureHunter(3)2' // Waveriding Treasure Hunter (III) 2
	| 'WaveridingTreasureHunter(3)3' // Waveriding Treasure Hunter (III) 3
	| 'WaveridingAdventurer(3)1' // Waveriding Adventurer (III) 1
	| 'WaveridingAdventurer(3)2' // Waveriding Adventurer (III) 2
	| 'WaveridingAdventurer(3)3' // Waveriding Adventurer (III) 3
	| 'SemnaiSansShadow' // Semnai Sans Shadow
	| 'NarzissenkreuzNotes' // Narzissenkreuz Notes
	| 'ContinentalExplorerWhereTheBishuiLingers' // Continental Explorer: Where the Bishui Lingers
	| 'ChenyusMeasure' // Chenyu's Measure
	| 'JadehallGuide1' // Jadehall Guide 1
	| 'JadehallGuide2' // Jadehall Guide 2
	| 'JadehallGuide3' // Jadehall Guide 3
	| 'JademoundTreasureHunter1' // Jademound Treasure Hunter 1
	| 'JademoundTreasureHunter2' // Jademound Treasure Hunter 2
	| 'JademoundTreasureHunter3' // Jademound Treasure Hunter 3
	| 'JademoundAdventurer1' // Jademound Adventurer 1
	| 'JademoundAdventurer2' // Jademound Adventurer 2
	| 'JademoundAdventurer3' // Jademound Adventurer 3
	| 'OneRingForTheRiteOfAll' // One Ring for the Rite of All
	| 'ChenyusBlessingsOfSunkenJade'; // Chenyu's Blessings of Sunken Jade
