const descriptorutils = require('./utils/descriptor_utils');
const rangeutils = require('./utils/range_utils');
const cardutils = require('./utils/card_utils');
const equityutils = require('./utils/equity_utils');


const COMBOS_ORDERED = rangeutils.CO;
// eslint-disable-next-line max-len
const COMBOS_FLOP = {'AA': {'fullhouse': 192, 'overcards': 17296, 'twopair': 3168, 'backdoorflushdraw': 5588, 'pair': 14080, 'overpair': 14080, 'flushdraw': 440, 'flushdraw_pair': 440, 'flushdraw_gutshot': 16, 'gutshot': 512, 'gutshot_pair': 512, 'trips': 2112, 'set': 2112, 'quads': 48}, 'AKs': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 13244, 'pair': 7920, 'secondpair': 1320, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 6600, 'flush': 164, 'gutshot': 2224, 'gutshot_overcards': 1792, 'highcard': 10332, 'acehigh': 10332, 'flushdraw_gutshot': 288, 'gutshot_pair': 432, 'straightflush': 1, 'straight': 63, 'quads': 2, 'fullhouse': 18}, 'AKo': {'trips': 308, 'overcards': 13244, 'pair': 7920, 'secondpair': 1320, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 6600, 'highcard': 10496, 'acehigh': 10496, 'flushdraw': 440, 'flushdraw_gutshot': 62, 'gutshot': 2224, 'gutshot_overcards': 1792, 'flushdraw_pair': 110, 'gutshot_pair': 432, 'straight': 64, 'quads': 2, 'fullhouse': 18}, 'AQs': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 9880, 'pair': 7920, 'secondpair': 1800, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 6120, 'flush': 164, 'gutshot': 2224, 'gutshot_overcards': 768, 'highcard': 10332, 'acehigh': 10332, 'flushdraw_gutshot': 288, 'oesd': 128, 'flushdraw_oesd': 18, 'gutshot_pair': 432, 'straightflush': 1, 'straight': 63, 'quads': 2, 'fullhouse': 18}, 'AQo': {'trips': 308, 'overcards': 9880, 'pair': 7920, 'secondpair': 1800, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 6120, 'highcard': 10496, 'acehigh': 10496, 'flushdraw': 440, 'flushdraw_gutshot': 62, 'gutshot': 2224, 'gutshot_overcards': 768, 'flushdraw_pair': 110, 'flushdraw_oesd': 4, 'oesd': 128, 'gutshot_pair': 432, 'straight': 64, 'quads': 2, 'fullhouse': 18}, 'AJs': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 7140, 'pair': 7920, 'secondpair': 2184, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 5688, 'flush': 164, 'gutshot': 2352, 'gutshot_overcards': 448, 'highcard': 10332, 'acehigh': 10332, 'flushdraw_gutshot': 306, 'oesd': 192, 'flushdraw_oesd': 27, 'gutshot_pair': 432, 'straightflush': 1, 'straight': 63, 'quads': 2, 'fullhouse': 18, 'weakpair': 48}, 'AJo': {'trips': 308, 'overcards': 7140, 'pair': 7920, 'secondpair': 2184, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 5688, 'highcard': 10496, 'acehigh': 10496, 'flushdraw': 440, 'flushdraw_gutshot': 66, 'gutshot': 2352, 'gutshot_overcards': 448, 'flushdraw_pair': 110, 'flushdraw_oesd': 6, 'oesd': 192, 'gutshot_pair': 432, 'straight': 64, 'quads': 2, 'fullhouse': 18, 'weakpair': 48}, 'ATs': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 4960, 'pair': 7920, 'secondpair': 2472, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 5304, 'flush': 164, 'gutshot': 2480, 'gutshot_overcards': 448, 'highcard': 10332, 'acehigh': 10332, 'flushdraw_gutshot': 324, 'oesd': 256, 'flushdraw_oesd': 36, 'quads': 2, 'fullhouse': 18, 'weakpair': 144, 'gutshot_pair': 432, 'straightflush': 1, 'straight': 63}, 'ATo': {'trips': 308, 'overcards': 4960, 'pair': 7920, 'secondpair': 2472, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 5304, 'highcard': 10496, 'acehigh': 10496, 'flushdraw': 440, 'flushdraw_gutshot': 70, 'gutshot': 2480, 'gutshot_overcards': 448, 'flushdraw_pair': 110, 'flushdraw_oesd': 8, 'oesd': 256, 'quads': 2, 'fullhouse': 18, 'weakpair': 144, 'gutshot_pair': 432, 'straight': 64}, 'A9s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 3276, 'pair': 7920, 'secondpair': 2664, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 4968, 'flush': 165, 'gutshot': 1024, 'gutshot_overcards': 448, 'highcard': 10395, 'acehigh': 10395, 'flushdraw_gutshot': 144, 'oesd': 256, 'flushdraw_oesd': 36, 'quads': 2, 'fullhouse': 18, 'weakpair': 288}, 'A9o': {'trips': 308, 'overcards': 3276, 'pair': 7920, 'secondpair': 2664, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 4968, 'highcard': 10560, 'acehigh': 10560, 'flushdraw': 440, 'flushdraw_gutshot': 32, 'gutshot': 1024, 'gutshot_overcards': 448, 'flushdraw_pair': 110, 'flushdraw_oesd': 8, 'oesd': 256, 'quads': 2, 'fullhouse': 18, 'weakpair': 288}, 'A8s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 2024, 'pair': 7920, 'secondpair': 2760, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 4680, 'flush': 165, 'gutshot': 1152, 'gutshot_overcards': 448, 'highcard': 10395, 'acehigh': 10395, 'flushdraw_gutshot': 162, 'oesd': 320, 'flushdraw_oesd': 45, 'quads': 2, 'fullhouse': 18, 'weakpair': 480}, 'A8o': {'trips': 308, 'overcards': 2024, 'pair': 7920, 'secondpair': 2760, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 4680, 'highcard': 10560, 'acehigh': 10560, 'flushdraw': 440, 'flushdraw_gutshot': 36, 'gutshot': 1152, 'gutshot_overcards': 448, 'flushdraw_pair': 110, 'flushdraw_oesd': 10, 'oesd': 320, 'quads': 2, 'fullhouse': 18, 'weakpair': 480}, 'A7s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 1140, 'pair': 7920, 'secondpair': 2760, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 4440, 'flush': 165, 'gutshot': 1152, 'gutshot_overcards': 320, 'highcard': 10395, 'acehigh': 10395, 'flushdraw_gutshot': 162, 'oesd': 320, 'flushdraw_oesd': 45, 'quads': 2, 'fullhouse': 18, 'weakpair': 720}, 'A7o': {'trips': 308, 'overcards': 1140, 'pair': 7920, 'secondpair': 2760, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 4440, 'highcard': 10560, 'acehigh': 10560, 'flushdraw': 440, 'flushdraw_gutshot': 36, 'gutshot': 1152, 'gutshot_overcards': 320, 'flushdraw_pair': 110, 'flushdraw_oesd': 10, 'oesd': 320, 'quads': 2, 'fullhouse': 18, 'weakpair': 720}, 'A6s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 560, 'pair': 7920, 'secondpair': 2664, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 4248, 'flush': 165, 'gutshot': 1024, 'gutshot_overcards': 192, 'highcard': 10395, 'acehigh': 10395, 'flushdraw_gutshot': 144, 'oesd': 256, 'flushdraw_oesd': 36, 'quads': 2, 'fullhouse': 18, 'weakpair': 1008}, 'A6o': {'trips': 308, 'overcards': 560, 'pair': 7920, 'secondpair': 2664, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 4248, 'highcard': 10560, 'acehigh': 10560, 'flushdraw': 440, 'flushdraw_gutshot': 32, 'gutshot': 1024, 'gutshot_overcards': 192, 'flushdraw_pair': 110, 'flushdraw_oesd': 8, 'oesd': 256, 'quads': 2, 'fullhouse': 18, 'weakpair': 1008}, 'A5s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 220, 'pair': 7920, 'secondpair': 2472, 'flushdraw': 2145, 'flushdraw_pair': 660, 'flushdraw_gutshot': 324, 'gutshot': 2480, 'gutshot_pair': 432, 'twopair': 792, 'toppair': 4104, 'straightflush': 1, 'straight': 63, 'flush': 164, 'highcard': 10332, 'acehigh': 10332, 'oesd': 256, 'flushdraw_oesd': 36, 'quads': 2, 'fullhouse': 18, 'weakpair': 1344}, 'A5o': {'trips': 308, 'overcards': 220, 'pair': 7920, 'secondpair': 2472, 'backdoorflushdraw': 5588, 'gutshot': 2480, 'gutshot_pair': 432, 'twopair': 792, 'toppair': 4104, 'straight': 64, 'flushdraw': 440, 'flushdraw_pair': 110, 'flushdraw_gutshot': 70, 'highcard': 10496, 'acehigh': 10496, 'flushdraw_oesd': 8, 'oesd': 256, 'quads': 2, 'fullhouse': 18, 'weakpair': 1344}, 'A4s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 56, 'pair': 7920, 'secondpair': 2184, 'flushdraw': 2145, 'flushdraw_pair': 660, 'flushdraw_gutshot': 306, 'gutshot': 2352, 'gutshot_pair': 432, 'twopair': 792, 'toppair': 4008, 'straightflush': 1, 'straight': 63, 'flush': 164, 'highcard': 10332, 'acehigh': 10332, 'oesd': 192, 'flushdraw_oesd': 27, 'quads': 2, 'fullhouse': 18, 'weakpair': 1728}, 'A4o': {'trips': 308, 'overcards': 56, 'pair': 7920, 'secondpair': 2184, 'backdoorflushdraw': 5588, 'gutshot': 2352, 'gutshot_pair': 432, 'twopair': 792, 'toppair': 4008, 'flushdraw': 440, 'flushdraw_pair': 110, 'flushdraw_gutshot': 66, 'straight': 64, 'highcard': 10496, 'acehigh': 10496, 'flushdraw_oesd': 6, 'oesd': 192, 'quads': 2, 'fullhouse': 18, 'weakpair': 1728}, 'A3s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 4, 'twopair': 792, 'pair': 7920, 'secondpair': 1800, 'flushdraw': 2145, 'flushdraw_pair': 660, 'flushdraw_gutshot': 288, 'gutshot': 2224, 'gutshot_pair': 432, 'toppair': 3960, 'straightflush': 1, 'straight': 63, 'flush': 164, 'highcard': 10332, 'acehigh': 10332, 'quads': 2, 'fullhouse': 18, 'weakpair': 2160, 'oesd': 128, 'flushdraw_oesd': 18}, 'A3o': {'trips': 308, 'overcards': 4, 'twopair': 792, 'backdoorflushdraw': 5588, 'pair': 7920, 'secondpair': 1800, 'gutshot': 2224, 'gutshot_pair': 432, 'flushdraw': 440, 'flushdraw_pair': 110, 'flushdraw_gutshot': 62, 'toppair': 3960, 'straight': 64, 'highcard': 10496, 'acehigh': 10496, 'quads': 2, 'fullhouse': 18, 'weakpair': 2160, 'flushdraw_oesd': 4, 'oesd': 128}, 'A2s': {'quads': 2, 'trips': 308, 'backdoorflushdraw': 9009, 'fullhouse': 18, 'twopair': 792, 'pair': 7920, 'weakpair': 2640, 'flushdraw': 2145, 'flushdraw_pair': 660, 'flushdraw_gutshot': 288, 'gutshot': 2224, 'gutshot_pair': 432, 'secondpair': 1320, 'toppair': 3960, 'straightflush': 1, 'straight': 63, 'flush': 164, 'highcard': 10332, 'acehigh': 10332}, 'A2o': {'quads': 2, 'trips': 308, 'backdoorflushdraw': 5588, 'fullhouse': 18, 'twopair': 792, 'pair': 7920, 'weakpair': 2640, 'flushdraw': 440, 'flushdraw_pair': 110, 'flushdraw_gutshot': 62, 'gutshot': 2224, 'gutshot_pair': 432, 'secondpair': 1320, 'toppair': 3960, 'straight': 64, 'highcard': 10496, 'acehigh': 10496}, 'KK': {'fullhouse': 192, 'overcards': 13244, 'twopair': 3168, 'backdoorflushdraw': 5588, 'pair': 14080, 'overpair': 10560, 'flushdraw': 440, 'flushdraw_pair': 440, 'trips': 2112, 'set': 2112, 'secondpair': 3520, 'quads': 48, 'flushdraw_gutshot': 12, 'gutshot': 384, 'gutshot_pair': 384, 'flushdraw_oesd': 2, 'oesd': 64, 'oesd_pair': 64}, 'KQs': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 9880, 'pair': 7920, 'secondpair': 2280, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 5640, 'flush': 163, 'highcard': 10269, 'acehigh': 2772, 'gutshot': 2496, 'gutshot_overcards': 896, 'flushdraw_gutshot': 318, 'oesd': 592, 'flushdraw_oesd': 75, 'gutshot_pair': 576, 'straightflush': 2, 'straight': 126, 'oesd_pair': 144, 'quads': 2, 'fullhouse': 18}, 'KQo': {'trips': 308, 'overcards': 9880, 'pair': 7920, 'secondpair': 2280, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 5640, 'highcard': 10432, 'flushdraw': 440, 'flushdraw_pair': 110, 'acehigh': 2816, 'flushdraw_gutshot': 68, 'gutshot': 2496, 'gutshot_overcards': 896, 'flushdraw_oesd': 16, 'oesd': 592, 'gutshot_pair': 576, 'straight': 128, 'oesd_pair': 144, 'quads': 2, 'fullhouse': 18}, 'KJs': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 7140, 'pair': 7920, 'secondpair': 2664, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 5208, 'flush': 163, 'highcard': 10269, 'acehigh': 2772, 'gutshot': 2496, 'gutshot_overcards': 448, 'flushdraw_gutshot': 318, 'oesd': 720, 'flushdraw_oesd': 93, 'gutshot_pair': 576, 'straightflush': 2, 'straight': 126, 'oesd_pair': 144, 'quads': 2, 'fullhouse': 18, 'weakpair': 48}, 'KJo': {'trips': 308, 'overcards': 7140, 'pair': 7920, 'secondpair': 2664, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 5208, 'highcard': 10432, 'flushdraw': 440, 'flushdraw_pair': 110, 'acehigh': 2816, 'flushdraw_gutshot': 68, 'gutshot': 2496, 'gutshot_overcards': 448, 'flushdraw_oesd': 20, 'oesd': 720, 'gutshot_pair': 576, 'straight': 128, 'oesd_pair': 144, 'quads': 2, 'fullhouse': 18, 'weakpair': 48}, 'KTs': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 4960, 'pair': 7920, 'secondpair': 2952, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 4824, 'flush': 163, 'highcard': 10269, 'acehigh': 2772, 'gutshot': 2624, 'flushdraw_gutshot': 336, 'oesd': 784, 'flushdraw_oesd': 102, 'gutshot_overcards': 192, 'gutshot_pair': 576, 'straightflush': 2, 'straight': 126, 'quads': 2, 'fullhouse': 18, 'weakpair': 144, 'oesd_pair': 144}, 'KTo': {'trips': 308, 'overcards': 4960, 'pair': 7920, 'secondpair': 2952, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 4824, 'highcard': 10432, 'flushdraw': 440, 'flushdraw_pair': 110, 'acehigh': 2816, 'flushdraw_gutshot': 72, 'gutshot': 2624, 'flushdraw_oesd': 22, 'oesd': 784, 'gutshot_overcards': 192, 'gutshot_pair': 576, 'straight': 128, 'quads': 2, 'fullhouse': 18, 'weakpair': 144, 'oesd_pair': 144}, 'K9s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 3276, 'pair': 7920, 'secondpair': 3144, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 4488, 'flush': 164, 'highcard': 10332, 'acehigh': 2835, 'gutshot': 2224, 'flushdraw_gutshot': 288, 'gutshot_overcards': 192, 'oesd': 256, 'flushdraw_oesd': 36, 'quads': 2, 'fullhouse': 18, 'weakpair': 288, 'gutshot_pair': 432, 'straightflush': 1, 'straight': 63}, 'K9o': {'trips': 308, 'overcards': 3276, 'pair': 7920, 'secondpair': 3144, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 4488, 'highcard': 10496, 'flushdraw': 440, 'flushdraw_pair': 110, 'acehigh': 2880, 'flushdraw_gutshot': 62, 'gutshot': 2224, 'gutshot_overcards': 192, 'flushdraw_oesd': 8, 'oesd': 256, 'quads': 2, 'fullhouse': 18, 'weakpair': 288, 'gutshot_pair': 432, 'straight': 64}, 'K8s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 2024, 'pair': 7920, 'secondpair': 3240, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 4200, 'flush': 165, 'highcard': 10395, 'acehigh': 2835, 'gutshot': 896, 'gutshot_overcards': 192, 'flushdraw_gutshot': 126, 'oesd': 320, 'flushdraw_oesd': 45, 'quads': 2, 'fullhouse': 18, 'weakpair': 480}, 'K8o': {'trips': 308, 'overcards': 2024, 'pair': 7920, 'secondpair': 3240, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 4200, 'highcard': 10560, 'flushdraw': 440, 'flushdraw_pair': 110, 'acehigh': 2880, 'flushdraw_gutshot': 28, 'gutshot': 896, 'gutshot_overcards': 192, 'flushdraw_oesd': 10, 'oesd': 320, 'quads': 2, 'fullhouse': 18, 'weakpair': 480}, 'K7s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 1140, 'pair': 7920, 'secondpair': 3240, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 3960, 'flush': 165, 'highcard': 10395, 'acehigh': 2835, 'gutshot': 1024, 'gutshot_overcards': 192, 'flushdraw_gutshot': 144, 'oesd': 384, 'flushdraw_oesd': 54, 'quads': 2, 'fullhouse': 18, 'weakpair': 720}, 'K7o': {'trips': 308, 'overcards': 1140, 'pair': 7920, 'secondpair': 3240, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 3960, 'highcard': 10560, 'flushdraw': 440, 'flushdraw_pair': 110, 'acehigh': 2880, 'flushdraw_gutshot': 32, 'gutshot': 1024, 'gutshot_overcards': 192, 'flushdraw_oesd': 12, 'oesd': 384, 'quads': 2, 'fullhouse': 18, 'weakpair': 720}, 'K6s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 560, 'pair': 7920, 'secondpair': 3144, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 3768, 'flush': 165, 'gutshot': 1152, 'gutshot_overcards': 192, 'highcard': 10395, 'flushdraw_gutshot': 162, 'acehigh': 2835, 'oesd': 320, 'flushdraw_oesd': 45, 'quads': 2, 'fullhouse': 18, 'weakpair': 1008}, 'K6o': {'trips': 308, 'overcards': 560, 'pair': 7920, 'secondpair': 3144, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 3768, 'highcard': 10560, 'flushdraw': 440, 'flushdraw_gutshot': 36, 'gutshot': 1152, 'gutshot_overcards': 192, 'flushdraw_pair': 110, 'acehigh': 2880, 'flushdraw_oesd': 10, 'oesd': 320, 'quads': 2, 'fullhouse': 18, 'weakpair': 1008}, 'K5s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 220, 'pair': 7920, 'secondpair': 2952, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 3624, 'flush': 165, 'oesd': 320, 'highcard': 10395, 'flushdraw_oesd': 45, 'gutshot': 1152, 'flushdraw_gutshot': 162, 'acehigh': 2835, 'quads': 2, 'fullhouse': 18, 'weakpair': 1344}, 'K5o': {'trips': 308, 'overcards': 220, 'pair': 7920, 'secondpair': 2952, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 3624, 'highcard': 10560, 'flushdraw': 440, 'flushdraw_oesd': 10, 'oesd': 320, 'flushdraw_pair': 110, 'flushdraw_gutshot': 36, 'gutshot': 1152, 'acehigh': 2880, 'quads': 2, 'fullhouse': 18, 'weakpair': 1344}, 'K4s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 56, 'pair': 7920, 'secondpair': 2664, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 3528, 'flush': 165, 'oesd': 256, 'highcard': 10395, 'flushdraw_oesd': 36, 'gutshot': 1024, 'flushdraw_gutshot': 144, 'acehigh': 2835, 'quads': 2, 'fullhouse': 18, 'weakpair': 1728}, 'K4o': {'trips': 308, 'overcards': 56, 'pair': 7920, 'secondpair': 2664, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 3528, 'flushdraw': 440, 'flushdraw_pair': 110, 'highcard': 10560, 'flushdraw_oesd': 8, 'oesd': 256, 'flushdraw_gutshot': 32, 'gutshot': 1024, 'acehigh': 2880, 'quads': 2, 'fullhouse': 18, 'weakpair': 1728}, 'K3s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 4, 'twopair': 792, 'pair': 7920, 'secondpair': 2280, 'flushdraw': 2145, 'flushdraw_pair': 660, 'toppair': 3480, 'flush': 165, 'oesd': 192, 'highcard': 10395, 'flushdraw_oesd': 27, 'gutshot': 896, 'flushdraw_gutshot': 126, 'acehigh': 2835, 'quads': 2, 'fullhouse': 18, 'weakpair': 2160}, 'K3o': {'trips': 308, 'overcards': 4, 'twopair': 792, 'backdoorflushdraw': 5588, 'pair': 7920, 'secondpair': 2280, 'flushdraw': 440, 'flushdraw_pair': 110, 'toppair': 3480, 'highcard': 10560, 'flushdraw_oesd': 6, 'oesd': 192, 'flushdraw_gutshot': 28, 'gutshot': 896, 'acehigh': 2880, 'quads': 2, 'fullhouse': 18, 'weakpair': 2160}, 'K2s': {'quads': 2, 'trips': 308, 'backdoorflushdraw': 9009, 'fullhouse': 18, 'twopair': 792, 'pair': 7920, 'weakpair': 2640, 'flushdraw': 2145, 'flushdraw_pair': 660, 'secondpair': 1800, 'toppair': 3480, 'flush': 165, 'oesd': 128, 'highcard': 10395, 'flushdraw_oesd': 18, 'gutshot': 768, 'flushdraw_gutshot': 108, 'acehigh': 2835}, 'K2o': {'quads': 2, 'trips': 308, 'backdoorflushdraw': 5588, 'fullhouse': 18, 'twopair': 792, 'pair': 7920, 'weakpair': 2640, 'flushdraw': 440, 'flushdraw_pair': 110, 'secondpair': 1800, 'toppair': 3480, 'highcard': 10560, 'flushdraw_oesd': 4, 'oesd': 128, 'flushdraw_gutshot': 24, 'gutshot': 768, 'acehigh': 2880}, 'QQ': {'fullhouse': 192, 'overcards': 9880, 'twopair': 3168, 'backdoorflushdraw': 5588, 'pair': 14080, 'overpair': 7680, 'flushdraw': 440, 'flushdraw_pair': 440, 'trips': 2112, 'set': 2112, 'secondpair': 5760, 'quads': 48, 'weakpair': 640, 'flushdraw_gutshot': 16, 'gutshot': 512, 'gutshot_pair': 512, 'flushdraw_oesd': 4, 'oesd': 128, 'oesd_pair': 128}, 'QJs': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 7140, 'pair': 7920, 'secondpair': 3048, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 4776, 'flush': 162, 'highcard': 10206, 'acehigh': 2772, 'gutshot': 2896, 'gutshot_overcards': 768, 'flushdraw_gutshot': 366, 'oesd': 1248, 'flushdraw_oesd': 159, 'gutshot_pair': 720, 'straightflush': 3, 'straight': 189, 'oesd_pair': 288, 'quads': 2, 'fullhouse': 18, 'weakpair': 96}, 'QJo': {'trips': 308, 'overcards': 7140, 'pair': 7920, 'secondpair': 3048, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 4776, 'highcard': 10368, 'flushdraw': 440, 'flushdraw_pair': 110, 'acehigh': 2816, 'flushdraw_gutshot': 78, 'gutshot': 2896, 'gutshot_overcards': 768, 'flushdraw_oesd': 34, 'oesd': 1248, 'gutshot_pair': 720, 'straight': 192, 'oesd_pair': 288, 'quads': 2, 'fullhouse': 18, 'weakpair': 96}, 'QTs': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 4960, 'pair': 7920, 'secondpair': 3336, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 4392, 'flush': 162, 'highcard': 10206, 'acehigh': 2772, 'gutshot': 2896, 'gutshot_overcards': 384, 'flushdraw_gutshot': 366, 'oesd': 1376, 'flushdraw_oesd': 177, 'gutshot_pair': 720, 'straightflush': 3, 'straight': 189, 'oesd_pair': 288, 'quads': 2, 'fullhouse': 18, 'weakpair': 192}, 'QTo': {'trips': 308, 'overcards': 4960, 'pair': 7920, 'secondpair': 3336, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 4392, 'highcard': 10368, 'flushdraw': 440, 'flushdraw_pair': 110, 'acehigh': 2816, 'flushdraw_gutshot': 78, 'gutshot': 2896, 'gutshot_overcards': 384, 'flushdraw_oesd': 38, 'oesd': 1376, 'gutshot_pair': 720, 'straight': 192, 'oesd_pair': 288, 'quads': 2, 'fullhouse': 18, 'weakpair': 192}, 'Q9s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 3276, 'pair': 7920, 'secondpair': 3528, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 4056, 'flush': 163, 'highcard': 10269, 'acehigh': 2835, 'gutshot': 2624, 'flushdraw_gutshot': 336, 'oesd': 784, 'flushdraw_oesd': 102, 'gutshot_overcards': 192, 'gutshot_pair': 576, 'straightflush': 2, 'straight': 126, 'quads': 2, 'fullhouse': 18, 'weakpair': 336, 'oesd_pair': 144}, 'Q9o': {'trips': 308, 'overcards': 3276, 'pair': 7920, 'secondpair': 3528, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 4056, 'highcard': 10432, 'flushdraw': 440, 'flushdraw_pair': 110, 'acehigh': 2880, 'flushdraw_gutshot': 72, 'gutshot': 2624, 'flushdraw_oesd': 22, 'oesd': 784, 'gutshot_overcards': 192, 'gutshot_pair': 576, 'straight': 128, 'quads': 2, 'fullhouse': 18, 'weakpair': 336, 'oesd_pair': 144}, 'Q8s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 2024, 'pair': 7920, 'secondpair': 3624, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 3768, 'flush': 164, 'highcard': 10332, 'acehigh': 2835, 'gutshot': 2224, 'flushdraw_gutshot': 288, 'gutshot_overcards': 192, 'oesd': 384, 'flushdraw_oesd': 54, 'quads': 2, 'fullhouse': 18, 'weakpair': 528, 'gutshot_pair': 432, 'straightflush': 1, 'straight': 63}, 'Q8o': {'trips': 308, 'overcards': 2024, 'pair': 7920, 'secondpair': 3624, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 3768, 'highcard': 10496, 'flushdraw': 440, 'flushdraw_pair': 110, 'acehigh': 2880, 'flushdraw_gutshot': 62, 'gutshot': 2224, 'gutshot_overcards': 192, 'flushdraw_oesd': 12, 'oesd': 384, 'quads': 2, 'fullhouse': 18, 'weakpair': 528, 'gutshot_pair': 432, 'straight': 64}, 'Q7s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 1140, 'pair': 7920, 'secondpair': 3624, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 3528, 'flush': 165, 'highcard': 10395, 'acehigh': 2835, 'gutshot': 1024, 'gutshot_overcards': 192, 'flushdraw_gutshot': 144, 'oesd': 384, 'flushdraw_oesd': 54, 'quads': 2, 'fullhouse': 18, 'weakpair': 768}, 'Q7o': {'trips': 308, 'overcards': 1140, 'pair': 7920, 'secondpair': 3624, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 3528, 'highcard': 10560, 'flushdraw': 440, 'flushdraw_pair': 110, 'acehigh': 2880, 'flushdraw_gutshot': 32, 'gutshot': 1024, 'gutshot_overcards': 192, 'flushdraw_oesd': 12, 'oesd': 384, 'quads': 2, 'fullhouse': 18, 'weakpair': 768}, 'Q6s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 560, 'pair': 7920, 'secondpair': 3528, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 3336, 'flush': 165, 'gutshot': 1152, 'gutshot_overcards': 192, 'highcard': 10395, 'flushdraw_gutshot': 162, 'acehigh': 2835, 'oesd': 448, 'flushdraw_oesd': 63, 'quads': 2, 'fullhouse': 18, 'weakpair': 1056}, 'Q6o': {'trips': 308, 'overcards': 560, 'pair': 7920, 'secondpair': 3528, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 3336, 'highcard': 10560, 'flushdraw': 440, 'flushdraw_gutshot': 36, 'gutshot': 1152, 'gutshot_overcards': 192, 'flushdraw_pair': 110, 'acehigh': 2880, 'flushdraw_oesd': 14, 'oesd': 448, 'quads': 2, 'fullhouse': 18, 'weakpair': 1056}, 'Q5s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 220, 'pair': 7920, 'secondpair': 3336, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 3192, 'flush': 165, 'oesd': 384, 'highcard': 10395, 'flushdraw_oesd': 54, 'gutshot': 1280, 'flushdraw_gutshot': 180, 'acehigh': 2835, 'quads': 2, 'fullhouse': 18, 'weakpair': 1392}, 'Q5o': {'trips': 308, 'overcards': 220, 'pair': 7920, 'secondpair': 3336, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 3192, 'highcard': 10560, 'flushdraw': 440, 'flushdraw_oesd': 12, 'oesd': 384, 'flushdraw_pair': 110, 'flushdraw_gutshot': 40, 'gutshot': 1280, 'acehigh': 2880, 'quads': 2, 'fullhouse': 18, 'weakpair': 1392}, 'Q4s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 56, 'pair': 7920, 'secondpair': 3048, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 3096, 'flush': 165, 'oesd': 320, 'highcard': 10395, 'flushdraw_oesd': 45, 'gutshot': 1152, 'flushdraw_gutshot': 162, 'acehigh': 2835, 'quads': 2, 'fullhouse': 18, 'weakpair': 1776}, 'Q4o': {'trips': 308, 'overcards': 56, 'pair': 7920, 'secondpair': 3048, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 3096, 'flushdraw': 440, 'flushdraw_pair': 110, 'highcard': 10560, 'flushdraw_oesd': 10, 'oesd': 320, 'flushdraw_gutshot': 36, 'gutshot': 1152, 'acehigh': 2880, 'quads': 2, 'fullhouse': 18, 'weakpair': 1776}, 'Q3s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 4, 'twopair': 792, 'pair': 7920, 'secondpair': 2664, 'flushdraw': 2145, 'flushdraw_pair': 660, 'toppair': 3048, 'flush': 165, 'oesd': 256, 'highcard': 10395, 'flushdraw_oesd': 36, 'gutshot': 1024, 'flushdraw_gutshot': 144, 'acehigh': 2835, 'quads': 2, 'fullhouse': 18, 'weakpair': 2208}, 'Q3o': {'trips': 308, 'overcards': 4, 'twopair': 792, 'backdoorflushdraw': 5588, 'pair': 7920, 'secondpair': 2664, 'flushdraw': 440, 'flushdraw_pair': 110, 'toppair': 3048, 'highcard': 10560, 'flushdraw_oesd': 8, 'oesd': 256, 'flushdraw_gutshot': 32, 'gutshot': 1024, 'acehigh': 2880, 'quads': 2, 'fullhouse': 18, 'weakpair': 2208}, 'Q2s': {'quads': 2, 'trips': 308, 'backdoorflushdraw': 9009, 'fullhouse': 18, 'twopair': 792, 'pair': 7920, 'weakpair': 2688, 'flushdraw': 2145, 'flushdraw_pair': 660, 'secondpair': 2184, 'toppair': 3048, 'flush': 165, 'oesd': 192, 'highcard': 10395, 'flushdraw_oesd': 27, 'gutshot': 896, 'flushdraw_gutshot': 126, 'acehigh': 2835}, 'Q2o': {'quads': 2, 'trips': 308, 'backdoorflushdraw': 5588, 'fullhouse': 18, 'twopair': 792, 'pair': 7920, 'weakpair': 2688, 'flushdraw': 440, 'flushdraw_pair': 110, 'secondpair': 2184, 'toppair': 3048, 'highcard': 10560, 'flushdraw_oesd': 6, 'oesd': 192, 'flushdraw_gutshot': 28, 'gutshot': 896, 'acehigh': 2880}, 'JJ': {'fullhouse': 192, 'overcards': 7140, 'twopair': 3168, 'backdoorflushdraw': 5588, 'pair': 14080, 'overpair': 5376, 'flushdraw': 440, 'flushdraw_pair': 440, 'trips': 2112, 'set': 2112, 'secondpair': 6912, 'quads': 48, 'weakpair': 1792, 'flushdraw_gutshot': 20, 'gutshot': 640, 'gutshot_pair': 640, 'flushdraw_oesd': 6, 'oesd': 192, 'oesd_pair': 192}, 'JTs': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 4960, 'pair': 7920, 'secondpair': 3624, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 4008, 'flush': 161, 'highcard': 10143, 'acehigh': 2772, 'gutshot': 3296, 'gutshot_overcards': 640, 'flushdraw_gutshot': 414, 'oesd': 1904, 'flushdraw_oesd': 243, 'gutshot_pair': 864, 'straightflush': 4, 'straight': 252, 'oesd_pair': 432, 'quads': 2, 'fullhouse': 18, 'weakpair': 288}, 'JTo': {'trips': 308, 'overcards': 4960, 'pair': 7920, 'secondpair': 3624, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 4008, 'highcard': 10304, 'flushdraw': 440, 'flushdraw_pair': 110, 'acehigh': 2816, 'flushdraw_gutshot': 88, 'gutshot': 3296, 'gutshot_overcards': 640, 'flushdraw_oesd': 52, 'oesd': 1904, 'gutshot_pair': 864, 'straight': 256, 'oesd_pair': 432, 'quads': 2, 'fullhouse': 18, 'weakpair': 288}, 'J9s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 3276, 'pair': 7920, 'secondpair': 3816, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 3672, 'flush': 162, 'highcard': 10206, 'acehigh': 2835, 'gutshot': 2896, 'gutshot_overcards': 320, 'flushdraw_gutshot': 366, 'oesd': 1376, 'flushdraw_oesd': 177, 'gutshot_pair': 720, 'straightflush': 3, 'straight': 189, 'oesd_pair': 288, 'quads': 2, 'fullhouse': 18, 'weakpair': 432}, 'J9o': {'trips': 308, 'overcards': 3276, 'pair': 7920, 'secondpair': 3816, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 3672, 'highcard': 10368, 'flushdraw': 440, 'flushdraw_pair': 110, 'acehigh': 2880, 'flushdraw_gutshot': 78, 'gutshot': 2896, 'gutshot_overcards': 320, 'flushdraw_oesd': 38, 'oesd': 1376, 'gutshot_pair': 720, 'straight': 192, 'oesd_pair': 288, 'quads': 2, 'fullhouse': 18, 'weakpair': 432}, 'J8s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 2024, 'pair': 7920, 'secondpair': 3912, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 3384, 'flush': 163, 'highcard': 10269, 'acehigh': 2835, 'gutshot': 2624, 'flushdraw_gutshot': 336, 'oesd': 912, 'flushdraw_oesd': 120, 'gutshot_overcards': 192, 'gutshot_pair': 576, 'straightflush': 2, 'straight': 126, 'quads': 2, 'fullhouse': 18, 'weakpair': 624, 'oesd_pair': 144}, 'J8o': {'trips': 308, 'overcards': 2024, 'pair': 7920, 'secondpair': 3912, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 3384, 'highcard': 10432, 'flushdraw': 440, 'flushdraw_pair': 110, 'acehigh': 2880, 'flushdraw_gutshot': 72, 'gutshot': 2624, 'flushdraw_oesd': 26, 'oesd': 912, 'gutshot_overcards': 192, 'gutshot_pair': 576, 'straight': 128, 'quads': 2, 'fullhouse': 18, 'weakpair': 624, 'oesd_pair': 144}, 'J7s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 1140, 'pair': 7920, 'secondpair': 3912, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 3144, 'flush': 164, 'highcard': 10332, 'acehigh': 2835, 'gutshot': 2352, 'flushdraw_gutshot': 306, 'gutshot_overcards': 192, 'oesd': 448, 'flushdraw_oesd': 63, 'quads': 2, 'fullhouse': 18, 'weakpair': 864, 'gutshot_pair': 432, 'straightflush': 1, 'straight': 63}, 'J7o': {'trips': 308, 'overcards': 1140, 'pair': 7920, 'secondpair': 3912, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 3144, 'highcard': 10496, 'flushdraw': 440, 'flushdraw_pair': 110, 'acehigh': 2880, 'flushdraw_gutshot': 66, 'gutshot': 2352, 'gutshot_overcards': 192, 'flushdraw_oesd': 14, 'oesd': 448, 'quads': 2, 'fullhouse': 18, 'weakpair': 864, 'gutshot_pair': 432, 'straight': 64}, 'J6s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 560, 'pair': 7920, 'secondpair': 3816, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 2952, 'flush': 165, 'gutshot': 1152, 'gutshot_overcards': 192, 'highcard': 10395, 'flushdraw_gutshot': 162, 'acehigh': 2835, 'oesd': 448, 'flushdraw_oesd': 63, 'quads': 2, 'fullhouse': 18, 'weakpair': 1152}, 'J6o': {'trips': 308, 'overcards': 560, 'pair': 7920, 'secondpair': 3816, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 2952, 'highcard': 10560, 'flushdraw': 440, 'flushdraw_gutshot': 36, 'gutshot': 1152, 'gutshot_overcards': 192, 'flushdraw_pair': 110, 'acehigh': 2880, 'flushdraw_oesd': 14, 'oesd': 448, 'quads': 2, 'fullhouse': 18, 'weakpair': 1152}, 'J5s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 220, 'pair': 7920, 'secondpair': 3624, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 2808, 'flush': 165, 'oesd': 512, 'highcard': 10395, 'flushdraw_oesd': 72, 'gutshot': 1280, 'flushdraw_gutshot': 180, 'acehigh': 2835, 'quads': 2, 'fullhouse': 18, 'weakpair': 1488}, 'J5o': {'trips': 308, 'overcards': 220, 'pair': 7920, 'secondpair': 3624, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 2808, 'highcard': 10560, 'flushdraw': 440, 'flushdraw_oesd': 16, 'oesd': 512, 'flushdraw_pair': 110, 'flushdraw_gutshot': 40, 'gutshot': 1280, 'acehigh': 2880, 'quads': 2, 'fullhouse': 18, 'weakpair': 1488}, 'J4s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 56, 'pair': 7920, 'secondpair': 3336, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 2712, 'flush': 165, 'oesd': 384, 'highcard': 10395, 'flushdraw_oesd': 54, 'gutshot': 1280, 'flushdraw_gutshot': 180, 'acehigh': 2835, 'quads': 2, 'fullhouse': 18, 'weakpair': 1872}, 'J4o': {'trips': 308, 'overcards': 56, 'pair': 7920, 'secondpair': 3336, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 2712, 'flushdraw': 440, 'flushdraw_pair': 110, 'highcard': 10560, 'flushdraw_oesd': 12, 'oesd': 384, 'flushdraw_gutshot': 40, 'gutshot': 1280, 'acehigh': 2880, 'quads': 2, 'fullhouse': 18, 'weakpair': 1872}, 'J3s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 4, 'twopair': 792, 'pair': 7920, 'secondpair': 2952, 'flushdraw': 2145, 'flushdraw_pair': 660, 'toppair': 2664, 'flush': 165, 'oesd': 320, 'highcard': 10395, 'flushdraw_oesd': 45, 'gutshot': 1152, 'flushdraw_gutshot': 162, 'acehigh': 2835, 'quads': 2, 'fullhouse': 18, 'weakpair': 2304}, 'J3o': {'trips': 308, 'overcards': 4, 'twopair': 792, 'backdoorflushdraw': 5588, 'pair': 7920, 'secondpair': 2952, 'flushdraw': 440, 'flushdraw_pair': 110, 'toppair': 2664, 'highcard': 10560, 'flushdraw_oesd': 10, 'oesd': 320, 'flushdraw_gutshot': 36, 'gutshot': 1152, 'acehigh': 2880, 'quads': 2, 'fullhouse': 18, 'weakpair': 2304}, 'J2s': {'quads': 2, 'trips': 308, 'backdoorflushdraw': 9009, 'fullhouse': 18, 'twopair': 792, 'pair': 7920, 'weakpair': 2784, 'flushdraw': 2145, 'flushdraw_pair': 660, 'secondpair': 2472, 'toppair': 2664, 'flush': 165, 'oesd': 256, 'highcard': 10395, 'flushdraw_oesd': 36, 'gutshot': 1024, 'flushdraw_gutshot': 144, 'acehigh': 2835}, 'J2o': {'quads': 2, 'trips': 308, 'backdoorflushdraw': 5588, 'fullhouse': 18, 'twopair': 792, 'pair': 7920, 'weakpair': 2784, 'flushdraw': 440, 'flushdraw_pair': 110, 'secondpair': 2472, 'toppair': 2664, 'highcard': 10560, 'flushdraw_oesd': 8, 'oesd': 256, 'flushdraw_gutshot': 32, 'gutshot': 1024, 'acehigh': 2880}, 'TT': {'fullhouse': 192, 'overcards': 4960, 'twopair': 3168, 'backdoorflushdraw': 5588, 'pair': 14080, 'overpair': 3584, 'flushdraw': 440, 'flushdraw_pair': 440, 'trips': 2112, 'set': 2112, 'secondpair': 7168, 'quads': 48, 'weakpair': 3328, 'flushdraw_gutshot': 24, 'gutshot': 768, 'gutshot_pair': 768, 'flushdraw_oesd': 8, 'oesd': 256, 'oesd_pair': 256}, 'T9s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 3276, 'pair': 7920, 'secondpair': 4008, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 3336, 'flush': 161, 'highcard': 10143, 'acehigh': 2835, 'gutshot': 3296, 'gutshot_overcards': 512, 'flushdraw_gutshot': 414, 'oesd': 1904, 'flushdraw_oesd': 243, 'gutshot_pair': 864, 'straightflush': 4, 'straight': 252, 'oesd_pair': 432, 'quads': 2, 'fullhouse': 18, 'weakpair': 576}, 'T9o': {'trips': 308, 'overcards': 3276, 'pair': 7920, 'secondpair': 4008, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 3336, 'highcard': 10304, 'flushdraw': 440, 'flushdraw_pair': 110, 'acehigh': 2880, 'flushdraw_gutshot': 88, 'gutshot': 3296, 'gutshot_overcards': 512, 'flushdraw_oesd': 52, 'oesd': 1904, 'gutshot_pair': 864, 'straight': 256, 'oesd_pair': 432, 'quads': 2, 'fullhouse': 18, 'weakpair': 576}, 'T8s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 2024, 'pair': 7920, 'secondpair': 4104, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 3048, 'flush': 162, 'highcard': 10206, 'acehigh': 2835, 'gutshot': 2896, 'gutshot_overcards': 256, 'flushdraw_gutshot': 366, 'oesd': 1504, 'flushdraw_oesd': 195, 'gutshot_pair': 720, 'straightflush': 3, 'straight': 189, 'oesd_pair': 288, 'quads': 2, 'fullhouse': 18, 'weakpair': 768}, 'T8o': {'trips': 308, 'overcards': 2024, 'pair': 7920, 'secondpair': 4104, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 3048, 'highcard': 10368, 'flushdraw': 440, 'flushdraw_pair': 110, 'acehigh': 2880, 'flushdraw_gutshot': 78, 'gutshot': 2896, 'gutshot_overcards': 256, 'flushdraw_oesd': 42, 'oesd': 1504, 'gutshot_pair': 720, 'straight': 192, 'oesd_pair': 288, 'quads': 2, 'fullhouse': 18, 'weakpair': 768}, 'T7s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 1140, 'pair': 7920, 'secondpair': 4104, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 2808, 'flush': 163, 'highcard': 10269, 'acehigh': 2835, 'gutshot': 2752, 'flushdraw_gutshot': 354, 'oesd': 976, 'flushdraw_oesd': 129, 'gutshot_overcards': 192, 'gutshot_pair': 576, 'straightflush': 2, 'straight': 126, 'quads': 2, 'fullhouse': 18, 'weakpair': 1008, 'oesd_pair': 144}, 'T7o': {'trips': 308, 'overcards': 1140, 'pair': 7920, 'secondpair': 4104, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 2808, 'highcard': 10432, 'flushdraw': 440, 'flushdraw_pair': 110, 'acehigh': 2880, 'flushdraw_gutshot': 76, 'gutshot': 2752, 'flushdraw_oesd': 28, 'oesd': 976, 'gutshot_overcards': 192, 'gutshot_pair': 576, 'straight': 128, 'quads': 2, 'fullhouse': 18, 'weakpair': 1008, 'oesd_pair': 144}, 'T6s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 560, 'pair': 7920, 'secondpair': 4008, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 2616, 'flush': 164, 'gutshot': 2480, 'gutshot_overcards': 192, 'highcard': 10332, 'flushdraw_gutshot': 324, 'acehigh': 2835, 'oesd': 512, 'flushdraw_oesd': 72, 'quads': 2, 'fullhouse': 18, 'weakpair': 1296, 'gutshot_pair': 432, 'straightflush': 1, 'straight': 63}, 'T6o': {'trips': 308, 'overcards': 560, 'pair': 7920, 'secondpair': 4008, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 2616, 'highcard': 10496, 'flushdraw': 440, 'flushdraw_gutshot': 70, 'gutshot': 2480, 'gutshot_overcards': 192, 'flushdraw_pair': 110, 'acehigh': 2880, 'flushdraw_oesd': 16, 'oesd': 512, 'quads': 2, 'fullhouse': 18, 'weakpair': 1296, 'gutshot_pair': 432, 'straight': 64}, 'T5s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 220, 'pair': 7920, 'secondpair': 3816, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 2472, 'flush': 165, 'oesd': 512, 'highcard': 10395, 'flushdraw_oesd': 72, 'gutshot': 1280, 'flushdraw_gutshot': 180, 'acehigh': 2835, 'quads': 2, 'fullhouse': 18, 'weakpair': 1632}, 'T5o': {'trips': 308, 'overcards': 220, 'pair': 7920, 'secondpair': 3816, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 2472, 'highcard': 10560, 'flushdraw': 440, 'flushdraw_oesd': 16, 'oesd': 512, 'flushdraw_pair': 110, 'flushdraw_gutshot': 40, 'gutshot': 1280, 'acehigh': 2880, 'quads': 2, 'fullhouse': 18, 'weakpair': 1632}, 'T4s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 56, 'pair': 7920, 'secondpair': 3528, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 2376, 'flush': 165, 'oesd': 512, 'highcard': 10395, 'flushdraw_oesd': 72, 'gutshot': 1280, 'flushdraw_gutshot': 180, 'acehigh': 2835, 'quads': 2, 'fullhouse': 18, 'weakpair': 2016}, 'T4o': {'trips': 308, 'overcards': 56, 'pair': 7920, 'secondpair': 3528, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 2376, 'flushdraw': 440, 'flushdraw_pair': 110, 'highcard': 10560, 'flushdraw_oesd': 16, 'oesd': 512, 'flushdraw_gutshot': 40, 'gutshot': 1280, 'acehigh': 2880, 'quads': 2, 'fullhouse': 18, 'weakpair': 2016}, 'T3s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 4, 'twopair': 792, 'pair': 7920, 'secondpair': 3144, 'flushdraw': 2145, 'flushdraw_pair': 660, 'toppair': 2328, 'flush': 165, 'oesd': 384, 'highcard': 10395, 'flushdraw_oesd': 54, 'gutshot': 1280, 'flushdraw_gutshot': 180, 'acehigh': 2835, 'quads': 2, 'fullhouse': 18, 'weakpair': 2448}, 'T3o': {'trips': 308, 'overcards': 4, 'twopair': 792, 'backdoorflushdraw': 5588, 'pair': 7920, 'secondpair': 3144, 'flushdraw': 440, 'flushdraw_pair': 110, 'toppair': 2328, 'highcard': 10560, 'flushdraw_oesd': 12, 'oesd': 384, 'flushdraw_gutshot': 40, 'gutshot': 1280, 'acehigh': 2880, 'quads': 2, 'fullhouse': 18, 'weakpair': 2448}, 'T2s': {'quads': 2, 'trips': 308, 'backdoorflushdraw': 9009, 'fullhouse': 18, 'twopair': 792, 'pair': 7920, 'weakpair': 2928, 'flushdraw': 2145, 'flushdraw_pair': 660, 'secondpair': 2664, 'toppair': 2328, 'flush': 165, 'oesd': 320, 'highcard': 10395, 'flushdraw_oesd': 45, 'gutshot': 1152, 'flushdraw_gutshot': 162, 'acehigh': 2835}, 'T2o': {'quads': 2, 'trips': 308, 'backdoorflushdraw': 5588, 'fullhouse': 18, 'twopair': 792, 'pair': 7920, 'weakpair': 2928, 'flushdraw': 440, 'flushdraw_pair': 110, 'secondpair': 2664, 'toppair': 2328, 'highcard': 10560, 'flushdraw_oesd': 10, 'oesd': 320, 'flushdraw_gutshot': 36, 'gutshot': 1152, 'acehigh': 2880}, '99': {'fullhouse': 192, 'overcards': 3276, 'twopair': 3168, 'backdoorflushdraw': 5588, 'pair': 14080, 'overpair': 2240, 'flushdraw': 440, 'flushdraw_pair': 440, 'trips': 2112, 'set': 2112, 'secondpair': 6720, 'quads': 48, 'weakpair': 5120, 'flushdraw_gutshot': 24, 'gutshot': 768, 'gutshot_pair': 768, 'flushdraw_oesd': 8, 'oesd': 256, 'oesd_pair': 256}, '98s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 2024, 'pair': 7920, 'secondpair': 4200, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 2760, 'flush': 161, 'highcard': 10143, 'acehigh': 2835, 'gutshot': 3296, 'gutshot_overcards': 384, 'flushdraw_gutshot': 414, 'oesd': 1904, 'flushdraw_oesd': 243, 'gutshot_pair': 864, 'straightflush': 4, 'straight': 252, 'oesd_pair': 432, 'quads': 2, 'fullhouse': 18, 'weakpair': 960}, '98o': {'trips': 308, 'overcards': 2024, 'pair': 7920, 'secondpair': 4200, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 2760, 'highcard': 10304, 'flushdraw': 440, 'flushdraw_pair': 110, 'acehigh': 2880, 'flushdraw_gutshot': 88, 'gutshot': 3296, 'gutshot_overcards': 384, 'flushdraw_oesd': 52, 'oesd': 1904, 'gutshot_pair': 864, 'straight': 256, 'oesd_pair': 432, 'quads': 2, 'fullhouse': 18, 'weakpair': 960}, '97s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 1140, 'pair': 7920, 'secondpair': 4200, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 2520, 'flush': 162, 'highcard': 10206, 'acehigh': 2835, 'gutshot': 2896, 'gutshot_overcards': 192, 'flushdraw_gutshot': 366, 'oesd': 1504, 'flushdraw_oesd': 195, 'gutshot_pair': 720, 'straightflush': 3, 'straight': 189, 'oesd_pair': 288, 'quads': 2, 'fullhouse': 18, 'weakpair': 1200}, '97o': {'trips': 308, 'overcards': 1140, 'pair': 7920, 'secondpair': 4200, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 2520, 'highcard': 10368, 'flushdraw': 440, 'flushdraw_pair': 110, 'acehigh': 2880, 'flushdraw_gutshot': 78, 'gutshot': 2896, 'gutshot_overcards': 192, 'flushdraw_oesd': 42, 'oesd': 1504, 'gutshot_pair': 720, 'straight': 192, 'oesd_pair': 288, 'quads': 2, 'fullhouse': 18, 'weakpair': 1200}, '96s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 560, 'pair': 7920, 'secondpair': 4104, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 2328, 'flush': 163, 'gutshot': 2752, 'gutshot_overcards': 192, 'highcard': 10269, 'flushdraw_gutshot': 354, 'acehigh': 2835, 'oesd': 976, 'flushdraw_oesd': 129, 'gutshot_pair': 576, 'straightflush': 2, 'straight': 126, 'quads': 2, 'fullhouse': 18, 'weakpair': 1488, 'oesd_pair': 144}, '96o': {'trips': 308, 'overcards': 560, 'pair': 7920, 'secondpair': 4104, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 2328, 'highcard': 10432, 'flushdraw': 440, 'flushdraw_gutshot': 76, 'gutshot': 2752, 'gutshot_overcards': 192, 'flushdraw_pair': 110, 'acehigh': 2880, 'flushdraw_oesd': 28, 'oesd': 976, 'gutshot_pair': 576, 'straight': 128, 'quads': 2, 'fullhouse': 18, 'weakpair': 1488, 'oesd_pair': 144}, '95s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 220, 'pair': 7920, 'secondpair': 3912, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 2184, 'flush': 164, 'oesd': 512, 'highcard': 10332, 'flushdraw_oesd': 72, 'gutshot': 2480, 'flushdraw_gutshot': 324, 'acehigh': 2835, 'quads': 2, 'fullhouse': 18, 'weakpair': 1824, 'gutshot_pair': 432, 'straightflush': 1, 'straight': 63}, '95o': {'trips': 308, 'overcards': 220, 'pair': 7920, 'secondpair': 3912, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 2184, 'highcard': 10496, 'flushdraw': 440, 'flushdraw_oesd': 16, 'oesd': 512, 'flushdraw_pair': 110, 'flushdraw_gutshot': 70, 'gutshot': 2480, 'acehigh': 2880, 'quads': 2, 'fullhouse': 18, 'weakpair': 1824, 'gutshot_pair': 432, 'straight': 64}, '94s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 56, 'pair': 7920, 'secondpair': 3624, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 2088, 'flush': 165, 'oesd': 448, 'highcard': 10395, 'flushdraw_oesd': 63, 'gutshot': 1152, 'flushdraw_gutshot': 162, 'acehigh': 2835, 'quads': 2, 'fullhouse': 18, 'weakpair': 2208}, '94o': {'trips': 308, 'overcards': 56, 'pair': 7920, 'secondpair': 3624, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 2088, 'flushdraw': 440, 'flushdraw_pair': 110, 'highcard': 10560, 'flushdraw_oesd': 14, 'oesd': 448, 'flushdraw_gutshot': 36, 'gutshot': 1152, 'acehigh': 2880, 'quads': 2, 'fullhouse': 18, 'weakpair': 2208}, '93s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 4, 'twopair': 792, 'pair': 7920, 'secondpair': 3240, 'flushdraw': 2145, 'flushdraw_pair': 660, 'toppair': 2040, 'flush': 165, 'oesd': 448, 'highcard': 10395, 'flushdraw_oesd': 63, 'gutshot': 1152, 'flushdraw_gutshot': 162, 'acehigh': 2835, 'quads': 2, 'fullhouse': 18, 'weakpair': 2640}, '93o': {'trips': 308, 'overcards': 4, 'twopair': 792, 'backdoorflushdraw': 5588, 'pair': 7920, 'secondpair': 3240, 'flushdraw': 440, 'flushdraw_pair': 110, 'toppair': 2040, 'highcard': 10560, 'flushdraw_oesd': 14, 'oesd': 448, 'flushdraw_gutshot': 36, 'gutshot': 1152, 'acehigh': 2880, 'quads': 2, 'fullhouse': 18, 'weakpair': 2640}, '92s': {'quads': 2, 'trips': 308, 'backdoorflushdraw': 9009, 'fullhouse': 18, 'twopair': 792, 'pair': 7920, 'weakpair': 3120, 'flushdraw': 2145, 'flushdraw_pair': 660, 'secondpair': 2760, 'toppair': 2040, 'flush': 165, 'oesd': 320, 'highcard': 10395, 'flushdraw_oesd': 45, 'gutshot': 1152, 'flushdraw_gutshot': 162, 'acehigh': 2835}, '92o': {'quads': 2, 'trips': 308, 'backdoorflushdraw': 5588, 'fullhouse': 18, 'twopair': 792, 'pair': 7920, 'weakpair': 3120, 'flushdraw': 440, 'flushdraw_pair': 110, 'secondpair': 2760, 'toppair': 2040, 'highcard': 10560, 'flushdraw_oesd': 10, 'oesd': 320, 'flushdraw_gutshot': 36, 'gutshot': 1152, 'acehigh': 2880}, '88': {'fullhouse': 192, 'overcards': 2024, 'twopair': 3168, 'backdoorflushdraw': 5588, 'pair': 14080, 'overpair': 1280, 'flushdraw': 440, 'flushdraw_pair': 440, 'trips': 2112, 'set': 2112, 'secondpair': 5760, 'quads': 48, 'weakpair': 7040, 'flushdraw_gutshot': 24, 'gutshot': 768, 'gutshot_pair': 768, 'flushdraw_oesd': 8, 'oesd': 256, 'oesd_pair': 256}, '87s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 1140, 'pair': 7920, 'secondpair': 4200, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 2280, 'flush': 161, 'highcard': 10143, 'acehigh': 2835, 'gutshot': 3296, 'gutshot_overcards': 256, 'flushdraw_gutshot': 414, 'oesd': 1904, 'flushdraw_oesd': 243, 'gutshot_pair': 864, 'straightflush': 4, 'straight': 252, 'oesd_pair': 432, 'quads': 2, 'fullhouse': 18, 'weakpair': 1440}, '87o': {'trips': 308, 'overcards': 1140, 'pair': 7920, 'secondpair': 4200, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 2280, 'highcard': 10304, 'flushdraw': 440, 'flushdraw_pair': 110, 'acehigh': 2880, 'flushdraw_gutshot': 88, 'gutshot': 3296, 'gutshot_overcards': 256, 'flushdraw_oesd': 52, 'oesd': 1904, 'gutshot_pair': 864, 'straight': 256, 'oesd_pair': 432, 'quads': 2, 'fullhouse': 18, 'weakpair': 1440}, '86s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 560, 'pair': 7920, 'secondpair': 4104, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 2088, 'flush': 162, 'gutshot': 2896, 'gutshot_overcards': 128, 'highcard': 10206, 'flushdraw_gutshot': 366, 'acehigh': 2835, 'oesd': 1504, 'flushdraw_oesd': 195, 'gutshot_pair': 720, 'straightflush': 3, 'straight': 189, 'oesd_pair': 288, 'quads': 2, 'fullhouse': 18, 'weakpair': 1728}, '86o': {'trips': 308, 'overcards': 560, 'pair': 7920, 'secondpair': 4104, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 2088, 'highcard': 10368, 'flushdraw': 440, 'flushdraw_gutshot': 78, 'gutshot': 2896, 'gutshot_overcards': 128, 'flushdraw_pair': 110, 'acehigh': 2880, 'flushdraw_oesd': 42, 'oesd': 1504, 'gutshot_pair': 720, 'straight': 192, 'oesd_pair': 288, 'quads': 2, 'fullhouse': 18, 'weakpair': 1728}, '85s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 220, 'pair': 7920, 'secondpair': 3912, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 1944, 'flush': 163, 'oesd': 976, 'highcard': 10269, 'flushdraw_oesd': 129, 'gutshot': 2752, 'flushdraw_gutshot': 354, 'acehigh': 2835, 'gutshot_pair': 576, 'straightflush': 2, 'straight': 126, 'quads': 2, 'fullhouse': 18, 'weakpair': 2064, 'oesd_pair': 144}, '85o': {'trips': 308, 'overcards': 220, 'pair': 7920, 'secondpair': 3912, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 1944, 'highcard': 10432, 'flushdraw': 440, 'flushdraw_oesd': 28, 'oesd': 976, 'flushdraw_pair': 110, 'flushdraw_gutshot': 76, 'gutshot': 2752, 'acehigh': 2880, 'gutshot_pair': 576, 'straight': 128, 'quads': 2, 'fullhouse': 18, 'weakpair': 2064, 'oesd_pair': 144}, '84s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 56, 'pair': 7920, 'secondpair': 3624, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 1848, 'flush': 164, 'oesd': 448, 'highcard': 10332, 'flushdraw_oesd': 63, 'gutshot': 2352, 'flushdraw_gutshot': 306, 'acehigh': 2835, 'quads': 2, 'fullhouse': 18, 'weakpair': 2448, 'gutshot_pair': 432, 'straightflush': 1, 'straight': 63}, '84o': {'trips': 308, 'overcards': 56, 'pair': 7920, 'secondpair': 3624, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 1848, 'flushdraw': 440, 'flushdraw_pair': 110, 'highcard': 10496, 'flushdraw_oesd': 14, 'oesd': 448, 'flushdraw_gutshot': 66, 'gutshot': 2352, 'acehigh': 2880, 'quads': 2, 'fullhouse': 18, 'weakpair': 2448, 'gutshot_pair': 432, 'straight': 64}, '83s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 4, 'twopair': 792, 'pair': 7920, 'secondpair': 3240, 'flushdraw': 2145, 'flushdraw_pair': 660, 'toppair': 1800, 'flush': 165, 'oesd': 384, 'highcard': 10395, 'flushdraw_oesd': 54, 'gutshot': 1024, 'flushdraw_gutshot': 144, 'acehigh': 2835, 'quads': 2, 'fullhouse': 18, 'weakpair': 2880}, '83o': {'trips': 308, 'overcards': 4, 'twopair': 792, 'backdoorflushdraw': 5588, 'pair': 7920, 'secondpair': 3240, 'flushdraw': 440, 'flushdraw_pair': 110, 'toppair': 1800, 'highcard': 10560, 'flushdraw_oesd': 12, 'oesd': 384, 'flushdraw_gutshot': 32, 'gutshot': 1024, 'acehigh': 2880, 'quads': 2, 'fullhouse': 18, 'weakpair': 2880}, '82s': {'quads': 2, 'trips': 308, 'backdoorflushdraw': 9009, 'fullhouse': 18, 'twopair': 792, 'pair': 7920, 'weakpair': 3360, 'flushdraw': 2145, 'flushdraw_pair': 660, 'secondpair': 2760, 'toppair': 1800, 'flush': 165, 'oesd': 384, 'highcard': 10395, 'flushdraw_oesd': 54, 'gutshot': 1024, 'flushdraw_gutshot': 144, 'acehigh': 2835}, '82o': {'quads': 2, 'trips': 308, 'backdoorflushdraw': 5588, 'fullhouse': 18, 'twopair': 792, 'pair': 7920, 'weakpair': 3360, 'flushdraw': 440, 'flushdraw_pair': 110, 'secondpair': 2760, 'toppair': 1800, 'highcard': 10560, 'flushdraw_oesd': 12, 'oesd': 384, 'flushdraw_gutshot': 32, 'gutshot': 1024, 'acehigh': 2880}, '77': {'fullhouse': 192, 'overcards': 1140, 'twopair': 3168, 'backdoorflushdraw': 5588, 'pair': 14080, 'overpair': 640, 'flushdraw': 440, 'flushdraw_pair': 440, 'trips': 2112, 'set': 2112, 'secondpair': 4480, 'quads': 48, 'weakpair': 8960, 'flushdraw_gutshot': 24, 'gutshot': 768, 'gutshot_pair': 768, 'flushdraw_oesd': 8, 'oesd': 256, 'oesd_pair': 256}, '76s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 560, 'pair': 7920, 'secondpair': 4008, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 1896, 'flush': 161, 'gutshot': 3296, 'gutshot_overcards': 128, 'highcard': 10143, 'flushdraw_gutshot': 414, 'acehigh': 2835, 'oesd': 1904, 'flushdraw_oesd': 243, 'gutshot_pair': 864, 'straightflush': 4, 'straight': 252, 'oesd_pair': 432, 'quads': 2, 'fullhouse': 18, 'weakpair': 2016}, '76o': {'trips': 308, 'overcards': 560, 'pair': 7920, 'secondpair': 4008, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 1896, 'highcard': 10304, 'flushdraw': 440, 'flushdraw_gutshot': 88, 'gutshot': 3296, 'gutshot_overcards': 128, 'flushdraw_pair': 110, 'acehigh': 2880, 'flushdraw_oesd': 52, 'oesd': 1904, 'gutshot_pair': 864, 'straight': 256, 'oesd_pair': 432, 'quads': 2, 'fullhouse': 18, 'weakpair': 2016}, '75s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 220, 'pair': 7920, 'secondpair': 3816, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 1752, 'flush': 162, 'oesd': 1504, 'highcard': 10206, 'flushdraw_oesd': 195, 'gutshot': 2896, 'flushdraw_gutshot': 366, 'acehigh': 2835, 'gutshot_pair': 720, 'straightflush': 3, 'straight': 189, 'oesd_pair': 288, 'quads': 2, 'fullhouse': 18, 'weakpair': 2352}, '75o': {'trips': 308, 'overcards': 220, 'pair': 7920, 'secondpair': 3816, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 1752, 'highcard': 10368, 'flushdraw': 440, 'flushdraw_oesd': 42, 'oesd': 1504, 'flushdraw_pair': 110, 'flushdraw_gutshot': 78, 'gutshot': 2896, 'acehigh': 2880, 'gutshot_pair': 720, 'straight': 192, 'oesd_pair': 288, 'quads': 2, 'fullhouse': 18, 'weakpair': 2352}, '74s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 56, 'pair': 7920, 'secondpair': 3528, 'flushdraw': 2145, 'flushdraw_pair': 660, 'twopair': 792, 'toppair': 1656, 'flush': 163, 'oesd': 912, 'highcard': 10269, 'flushdraw_oesd': 120, 'gutshot': 2624, 'flushdraw_gutshot': 336, 'acehigh': 2835, 'gutshot_pair': 576, 'straightflush': 2, 'straight': 126, 'quads': 2, 'fullhouse': 18, 'weakpair': 2736, 'oesd_pair': 144}, '74o': {'trips': 308, 'overcards': 56, 'pair': 7920, 'secondpair': 3528, 'backdoorflushdraw': 5588, 'twopair': 792, 'toppair': 1656, 'flushdraw': 440, 'flushdraw_pair': 110, 'highcard': 10432, 'flushdraw_oesd': 26, 'oesd': 912, 'flushdraw_gutshot': 72, 'gutshot': 2624, 'acehigh': 2880, 'gutshot_pair': 576, 'straight': 128, 'quads': 2, 'fullhouse': 18, 'weakpair': 2736, 'oesd_pair': 144}, '73s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 4, 'twopair': 792, 'pair': 7920, 'secondpair': 3144, 'flushdraw': 2145, 'flushdraw_pair': 660, 'toppair': 1608, 'flush': 164, 'oesd': 384, 'highcard': 10332, 'flushdraw_oesd': 54, 'gutshot': 2224, 'flushdraw_gutshot': 288, 'acehigh': 2835, 'quads': 2, 'fullhouse': 18, 'weakpair': 3168, 'gutshot_pair': 432, 'straightflush': 1, 'straight': 63}, '73o': {'trips': 308, 'overcards': 4, 'twopair': 792, 'backdoorflushdraw': 5588, 'pair': 7920, 'secondpair': 3144, 'flushdraw': 440, 'flushdraw_pair': 110, 'toppair': 1608, 'highcard': 10496, 'flushdraw_oesd': 12, 'oesd': 384, 'flushdraw_gutshot': 62, 'gutshot': 2224, 'acehigh': 2880, 'quads': 2, 'fullhouse': 18, 'weakpair': 3168, 'gutshot_pair': 432, 'straight': 64}, '72s': {'quads': 2, 'trips': 308, 'backdoorflushdraw': 9009, 'fullhouse': 18, 'twopair': 792, 'pair': 7920, 'weakpair': 3648, 'flushdraw': 2145, 'flushdraw_pair': 660, 'secondpair': 2664, 'toppair': 1608, 'flush': 165, 'oesd': 320, 'highcard': 10395, 'flushdraw_oesd': 45, 'gutshot': 896, 'flushdraw_gutshot': 126, 'acehigh': 2835}, '72o': {'quads': 2, 'trips': 308, 'backdoorflushdraw': 5588, 'fullhouse': 18, 'twopair': 792, 'pair': 7920, 'weakpair': 3648, 'flushdraw': 440, 'flushdraw_pair': 110, 'secondpair': 2664, 'toppair': 1608, 'highcard': 10560, 'flushdraw_oesd': 10, 'oesd': 320, 'flushdraw_gutshot': 28, 'gutshot': 896, 'acehigh': 2880}, '66': {'fullhouse': 192, 'overcards': 560, 'twopair': 3168, 'backdoorflushdraw': 5588, 'pair': 14080, 'overpair': 256, 'flushdraw': 440, 'flushdraw_pair': 440, 'flushdraw_gutshot': 24, 'gutshot': 768, 'gutshot_pair': 768, 'trips': 2112, 'set': 2112, 'secondpair': 3072, 'quads': 48, 'weakpair': 10752, 'flushdraw_oesd': 8, 'oesd': 256, 'oesd_pair': 256}, '65s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 220, 'pair': 7920, 'secondpair': 3624, 'flushdraw': 2145, 'flushdraw_pair': 660, 'flushdraw_gutshot': 414, 'gutshot': 3296, 'gutshot_pair': 864, 'twopair': 792, 'toppair': 1608, 'straightflush': 4, 'straight': 252, 'flush': 161, 'highcard': 10143, 'acehigh': 2835, 'oesd': 1904, 'flushdraw_oesd': 243, 'oesd_pair': 432, 'quads': 2, 'fullhouse': 18, 'weakpair': 2688}, '65o': {'trips': 308, 'overcards': 220, 'pair': 7920, 'secondpair': 3624, 'backdoorflushdraw': 5588, 'gutshot': 3296, 'gutshot_pair': 864, 'twopair': 792, 'toppair': 1608, 'straight': 256, 'flushdraw': 440, 'flushdraw_pair': 110, 'flushdraw_gutshot': 88, 'highcard': 10304, 'acehigh': 2880, 'flushdraw_oesd': 52, 'oesd': 1904, 'oesd_pair': 432, 'quads': 2, 'fullhouse': 18, 'weakpair': 2688}, '64s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 56, 'pair': 7920, 'secondpair': 3336, 'flushdraw': 2145, 'flushdraw_pair': 660, 'flushdraw_gutshot': 366, 'gutshot': 2896, 'gutshot_pair': 720, 'twopair': 792, 'toppair': 1512, 'straightflush': 3, 'straight': 189, 'flush': 162, 'highcard': 10206, 'acehigh': 2835, 'oesd': 1376, 'flushdraw_oesd': 177, 'oesd_pair': 288, 'quads': 2, 'fullhouse': 18, 'weakpair': 3072}, '64o': {'trips': 308, 'overcards': 56, 'pair': 7920, 'secondpair': 3336, 'backdoorflushdraw': 5588, 'gutshot': 2896, 'gutshot_pair': 720, 'twopair': 792, 'toppair': 1512, 'flushdraw': 440, 'flushdraw_pair': 110, 'flushdraw_gutshot': 78, 'straight': 192, 'highcard': 10368, 'acehigh': 2880, 'flushdraw_oesd': 38, 'oesd': 1376, 'oesd_pair': 288, 'quads': 2, 'fullhouse': 18, 'weakpair': 3072}, '63s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 4, 'twopair': 792, 'pair': 7920, 'secondpair': 2952, 'flushdraw': 2145, 'flushdraw_pair': 660, 'flushdraw_gutshot': 336, 'gutshot': 2624, 'gutshot_pair': 576, 'toppair': 1464, 'straightflush': 2, 'straight': 126, 'flush': 163, 'highcard': 10269, 'acehigh': 2835, 'quads': 2, 'fullhouse': 18, 'weakpair': 3504, 'flushdraw_oesd': 102, 'oesd': 784, 'oesd_pair': 144}, '63o': {'trips': 308, 'overcards': 4, 'twopair': 792, 'backdoorflushdraw': 5588, 'pair': 7920, 'secondpair': 2952, 'gutshot': 2624, 'gutshot_pair': 576, 'flushdraw': 440, 'flushdraw_pair': 110, 'flushdraw_gutshot': 72, 'toppair': 1464, 'straight': 128, 'highcard': 10432, 'acehigh': 2880, 'quads': 2, 'fullhouse': 18, 'weakpair': 3504, 'flushdraw_oesd': 22, 'oesd': 784, 'oesd_pair': 144}, '62s': {'quads': 2, 'trips': 308, 'backdoorflushdraw': 9009, 'fullhouse': 18, 'twopair': 792, 'pair': 7920, 'weakpair': 3984, 'flushdraw': 2145, 'flushdraw_pair': 660, 'flushdraw_gutshot': 288, 'gutshot': 2224, 'gutshot_pair': 432, 'secondpair': 2472, 'toppair': 1464, 'straightflush': 1, 'straight': 63, 'flush': 164, 'highcard': 10332, 'acehigh': 2835, 'oesd': 256, 'flushdraw_oesd': 36}, '62o': {'quads': 2, 'trips': 308, 'backdoorflushdraw': 5588, 'fullhouse': 18, 'twopair': 792, 'pair': 7920, 'weakpair': 3984, 'flushdraw': 440, 'flushdraw_pair': 110, 'flushdraw_gutshot': 62, 'gutshot': 2224, 'gutshot_pair': 432, 'secondpair': 2472, 'toppair': 1464, 'straight': 64, 'highcard': 10496, 'acehigh': 2880, 'flushdraw_oesd': 8, 'oesd': 256}, '55': {'fullhouse': 192, 'overcards': 220, 'twopair': 3168, 'backdoorflushdraw': 5588, 'pair': 14080, 'overpair': 64, 'flushdraw': 440, 'flushdraw_pair': 440, 'flushdraw_oesd': 8, 'oesd': 256, 'oesd_pair': 256, 'trips': 2112, 'set': 2112, 'secondpair': 1728, 'flushdraw_gutshot': 24, 'gutshot': 768, 'gutshot_pair': 768, 'quads': 48, 'weakpair': 12288}, '54s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 56, 'pair': 7920, 'secondpair': 3048, 'flushdraw': 2145, 'flushdraw_pair': 660, 'flushdraw_oesd': 243, 'oesd': 1904, 'oesd_pair': 432, 'twopair': 792, 'flushdraw_gutshot': 414, 'gutshot': 3296, 'gutshot_pair': 864, 'toppair': 1416, 'straightflush': 4, 'straight': 252, 'flush': 161, 'highcard': 10143, 'acehigh': 2772, 'quads': 2, 'fullhouse': 18, 'weakpair': 3456}, '54o': {'trips': 308, 'overcards': 56, 'pair': 7920, 'secondpair': 3048, 'backdoorflushdraw': 5588, 'oesd': 1904, 'oesd_pair': 432, 'twopair': 792, 'gutshot': 3296, 'gutshot_pair': 864, 'toppair': 1416, 'flushdraw': 440, 'flushdraw_pair': 110, 'flushdraw_oesd': 52, 'straight': 256, 'highcard': 10304, 'flushdraw_gutshot': 88, 'acehigh': 2816, 'quads': 2, 'fullhouse': 18, 'weakpair': 3456}, '53s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 4, 'twopair': 792, 'pair': 7920, 'secondpair': 2664, 'flushdraw': 2145, 'flushdraw_pair': 660, 'flushdraw_oesd': 177, 'oesd': 1376, 'oesd_pair': 288, 'flushdraw_gutshot': 366, 'gutshot': 2896, 'gutshot_pair': 720, 'toppair': 1368, 'straightflush': 3, 'straight': 189, 'flush': 162, 'highcard': 10206, 'acehigh': 2772, 'quads': 2, 'fullhouse': 18, 'weakpair': 3888}, '53o': {'trips': 308, 'overcards': 4, 'twopair': 792, 'backdoorflushdraw': 5588, 'pair': 7920, 'secondpair': 2664, 'oesd': 1376, 'oesd_pair': 288, 'gutshot': 2896, 'gutshot_pair': 720, 'flushdraw': 440, 'flushdraw_pair': 110, 'flushdraw_oesd': 38, 'flushdraw_gutshot': 78, 'toppair': 1368, 'straight': 192, 'highcard': 10368, 'acehigh': 2816, 'quads': 2, 'fullhouse': 18, 'weakpair': 3888}, '52s': {'quads': 2, 'trips': 308, 'backdoorflushdraw': 9009, 'fullhouse': 18, 'twopair': 792, 'pair': 7920, 'weakpair': 4368, 'flushdraw': 2145, 'flushdraw_pair': 660, 'flushdraw_oesd': 102, 'oesd': 784, 'oesd_pair': 144, 'flushdraw_gutshot': 336, 'gutshot': 2624, 'gutshot_pair': 576, 'secondpair': 2184, 'toppair': 1368, 'straightflush': 2, 'straight': 126, 'flush': 163, 'highcard': 10269, 'acehigh': 2772}, '52o': {'quads': 2, 'trips': 308, 'backdoorflushdraw': 5588, 'fullhouse': 18, 'twopair': 792, 'pair': 7920, 'weakpair': 4368, 'flushdraw': 440, 'flushdraw_pair': 110, 'flushdraw_oesd': 22, 'oesd': 784, 'oesd_pair': 144, 'flushdraw_gutshot': 72, 'gutshot': 2624, 'gutshot_pair': 576, 'secondpair': 2184, 'toppair': 1368, 'straight': 128, 'highcard': 10432, 'acehigh': 2816}, '44': {'fullhouse': 192, 'overcards': 56, 'twopair': 3168, 'backdoorflushdraw': 5588, 'trips': 2112, 'set': 2112, 'pair': 14080, 'secondpair': 640, 'flushdraw': 440, 'flushdraw_pair': 440, 'flushdraw_oesd': 6, 'oesd': 192, 'oesd_pair': 192, 'flushdraw_gutshot': 20, 'gutshot': 640, 'gutshot_pair': 640, 'quads': 48, 'weakpair': 13440}, '43s': {'trips': 308, 'backdoorflushdraw': 9009, 'overcards': 4, 'twopair': 792, 'pair': 7920, 'secondpair': 2280, 'flushdraw': 2145, 'flushdraw_pair': 660, 'flushdraw_oesd': 159, 'oesd': 1248, 'oesd_pair': 288, 'flushdraw_gutshot': 366, 'gutshot': 2896, 'gutshot_pair': 720, 'toppair': 1320, 'straightflush': 3, 'straight': 189, 'flush': 162, 'highcard': 10206, 'acehigh': 2772, 'quads': 2, 'fullhouse': 18, 'weakpair': 4320}, '43o': {'trips': 308, 'overcards': 4, 'twopair': 792, 'backdoorflushdraw': 5588, 'pair': 7920, 'secondpair': 2280, 'oesd': 1248, 'oesd_pair': 288, 'gutshot': 2896, 'gutshot_pair': 720, 'flushdraw': 440, 'flushdraw_pair': 110, 'flushdraw_oesd': 34, 'flushdraw_gutshot': 78, 'toppair': 1320, 'straight': 192, 'highcard': 10368, 'acehigh': 2816, 'quads': 2, 'fullhouse': 18, 'weakpair': 4320}, '42s': {'quads': 2, 'trips': 308, 'backdoorflushdraw': 9009, 'fullhouse': 18, 'twopair': 792, 'pair': 7920, 'weakpair': 4800, 'flushdraw': 2145, 'flushdraw_pair': 660, 'flushdraw_oesd': 93, 'oesd': 720, 'oesd_pair': 144, 'flushdraw_gutshot': 318, 'gutshot': 2496, 'gutshot_pair': 576, 'secondpair': 1800, 'toppair': 1320, 'straightflush': 2, 'straight': 126, 'flush': 163, 'highcard': 10269, 'acehigh': 2772}, '42o': {'quads': 2, 'trips': 308, 'backdoorflushdraw': 5588, 'fullhouse': 18, 'twopair': 792, 'pair': 7920, 'weakpair': 4800, 'flushdraw': 440, 'flushdraw_pair': 110, 'flushdraw_oesd': 20, 'oesd': 720, 'oesd_pair': 144, 'flushdraw_gutshot': 68, 'gutshot': 2496, 'gutshot_pair': 576, 'secondpair': 1800, 'toppair': 1320, 'straight': 128, 'highcard': 10432, 'acehigh': 2816}, '33': {'fullhouse': 192, 'overcards': 4, 'twopair': 3168, 'backdoorflushdraw': 5588, 'quads': 48, 'trips': 2112, 'set': 2112, 'pair': 14080, 'weakpair': 14080, 'flushdraw': 440, 'flushdraw_pair': 440, 'flushdraw_oesd': 4, 'oesd': 128, 'oesd_pair': 128, 'flushdraw_gutshot': 16, 'gutshot': 512, 'gutshot_pair': 512}, '32s': {'quads': 2, 'fullhouse': 18, 'trips': 308, 'backdoorflushdraw': 9009, 'twopair': 792, 'pair': 7920, 'weakpair': 5280, 'flushdraw': 2145, 'flushdraw_pair': 660, 'flushdraw_oesd': 75, 'oesd': 592, 'oesd_pair': 144, 'flushdraw_gutshot': 318, 'gutshot': 2496, 'gutshot_pair': 576, 'secondpair': 1320, 'toppair': 1320, 'straightflush': 2, 'straight': 126, 'flush': 163, 'highcard': 10269, 'acehigh': 2772}, '32o': {'quads': 2, 'fullhouse': 18, 'trips': 308, 'backdoorflushdraw': 5588, 'twopair': 792, 'pair': 7920, 'weakpair': 5280, 'flushdraw': 440, 'flushdraw_pair': 110, 'flushdraw_oesd': 16, 'oesd': 592, 'oesd_pair': 144, 'flushdraw_gutshot': 68, 'gutshot': 2496, 'gutshot_pair': 576, 'secondpair': 1320, 'toppair': 1320, 'straight': 128, 'highcard': 10432, 'acehigh': 2816}, '22': {'quads': 48, 'fullhouse': 192, 'trips': 2112, 'set': 2112, 'backdoorflushdraw': 5588, 'twopair': 3168, 'pair': 14080, 'weakpair': 14080, 'flushdraw': 440, 'flushdraw_pair': 440, 'flushdraw_oesd': 2, 'oesd': 64, 'oesd_pair': 64, 'flushdraw_gutshot': 12, 'gutshot': 384, 'gutshot_pair': 384}};
// eslint-disable-next-line max-len
const METERS = ['straightflush', 'quads', 'fullhouse', 'flush', 'straight', 'trips', 'set', 'twopair', 'pair', 'overpair', 'toppair', 'secondpair', 'weakpair', 'highcard', 'acehigh', 'flushdraw', 'flushdraw_pair', 'flushdraw_oesd', 'flushdraw_gutshot', 'backdoorflushdraw', 'oesd', 'oesd_pair', 'gutshot', 'gutshot_pair', 'gutshot_overcards', 'overcards'];
// eslint-disable-next-line max-len
const QUALIFIERS = ['straightflush', 'quads', 'fullhouse', 'flush', 'straight', 'trips', 'twopair', 'pair', 'highcard', 'flushdraw', 'backdoorflushdraw', 'oesd', 'gutshot', 'overcards'];
// eslint-disable-next-line max-len
const SUBQUALIFIERS = {'trips': ['set'], 'pair': ['overpair', 'toppair', 'secondpair', 'weakpair'], 'highcard': ['acehigh'], 'flushdraw': ['flushdraw_pair', 'flushdraw_oesd', 'flushdraw_gutshot'], 'oesd': ['oesd_pair'], 'gutshot': ['gutshot_pair', 'gutshot_overcards']};
// eslint-disable-next-line max-len
const QUALIFIER_DISPLAY = {'straightflush': 'Straight Flush', 'quads': 'Quads', 'fullhouse': 'Full House', 'flush': 'Flush', 'straight': 'Straight', 'trips': 'Trips', 'set': 'Set', 'twopair': 'Two Pair', 'pair': 'Pair', 'overpair': 'Overpair', 'toppair': 'Top Pair', 'secondpair': 'Second Pair', 'weakpair': 'Weak Pair', 'highcard': 'High Card', 'acehigh': 'Ace High', 'flushdraw': 'Flush Draw', 'flushdraw_pair': 'Flush Draw + Pair', 'flushdraw_oesd': 'Flush Draw + OESD', 'flushdraw_gutshot': 'Flush Draw + Gutshot', 'backdoorflushdraw': 'Backdoor Flush Draw', 'oesd': 'OESD', 'oesd_pair': 'OESD + Pair', 'gutshot': 'Gutshot', 'gutshot_pair': 'Gutshot + Pair', 'gutshot_overcards': 'Gutshot + Overcards', 'overcards': 'Overcards'};

const SUITS_TO_HTML = {
  's': '&spades;',
  'c': '&clubs;',
  'd': '&diams;',
  'h': '&hearts;',
};


const updateStats = function(id) {
  id = 0;
  const stats = {};
  let count = 0;
  for (const m of METERS) {
    stats[m] = 0;
  }
  for (const c of COMBOS_ORDERED) {
    if ($(`#${id}_${c}`).hasClass('selected')) {
      let multiplier = 0;
      if (c[0] === c[1]) {
        multiplier = 6;
      } else if (c[2] === 's') {
        multiplier = 4;
      } else {
        multiplier = 12;
      }
      count += 19600 * multiplier;
      const combos = COMBOS_FLOP[c];
      for (const k in combos) {
        stats[k] += multiplier * combos[k];
      }
    }
  }
  if (count === 0) {
    for (const k in stats) {
      $(`#preflop_${k}_meter`).val(0);
      $(`#preflop_${k}_percent`).text(0..toFixed(1) + '%');
    }
  } else {
    for (const k in stats) {
      const v = stats[k];
      $(`#preflop_${k}_meter`).val(v * 1000 / count);
      $(`#preflop_${k}_percent`).text((v * 100 / count).toFixed(1) + '%');
    }
  }
  updateWithBoard(id);
  updateSelection();
};


const getBoard = function() {
  const board = [];
  for (let i = 1; i <= 5; i++) {
    board.push($(`#board${i}`).attr('value'));
  }
  return board;
};


const getHole = function() {
  return [
    $('#hole1').attr('value'),
    $('#hole2').attr('value'),
  ];
};


const getCheckedQualifiers = function(tab) {
  const qualifiers = new Set();
  for (const m of METERS) {
    if ($(`#${tab}_${m}_box`).prop('checked')) {
      qualifiers.add(m);
    }
  }
  return qualifiers;
};


const hasIntersection = function(listA, setB) {
  for (const x of listA) {
    if (setB.has(x)) {
      return true;
    }
  }
  return false;
};


const makeComboText = function(c) {
  let card1;
  let card2;
  if (c[0][1] === 'h' || c[0][1] === 'd') {
    // eslint-disable-next-line max-len
    card1 = `<span style='color:red'>${c[0][0]}${SUITS_TO_HTML[c[0][1]]}</span>`;
  } else {
    // eslint-disable-next-line max-len
    card1 = `<span style='color:black'>${c[0][0]}${SUITS_TO_HTML[c[0][1]]}</span>`;
  }
  if (c[1][1] === 'h' || c[1][1] === 'd') {
    // eslint-disable-next-line max-len
    card2 = `<span style='color:red'>${c[1][0]}${SUITS_TO_HTML[c[1][1]]}</span>`;
  } else {
    // eslint-disable-next-line max-len
    card2 = `<span style='color:black'>${c[1][0]}${SUITS_TO_HTML[c[1][1]]}</span>`;
  }
  return card1 + card2;
};


const displayCombos = function(tab, combos) {
  if ($(`#${tab}_combos_all`).hasClass('show')) {
    $(`#${tab}_combos_all`).empty();
    for (let i = 0; i < combos.length; i++) {
      const text = makeComboText(combos[i]);
      if (i === combos.length - 1) {
        $(`#${tab}_combos_all`).append(text);
      } else {
        $(`#${tab}_combos_all`).append(text + ',&nbsp;');
      }
    }
  }
};


const setStats = function(tab, hands, board, deadCards) {
  const nextHands = [];
  const checkedQs = getCheckedQualifiers(tab);
  const stats = {};
  let count = 0;
  for (const m of METERS) {
    stats[m] = 0;
  }
  const exclusions = new Set(board.concat(deadCards));
  for (const h of hands) {
    if (exclusions.has(h[0]) || exclusions.has(h[1])) {
      continue;
    }
    count += 1;
    const qs = descriptorutils.qualifyCards(h, board);
    for (const q of qs) {
      stats[q] += 1;
    }
    if (hasIntersection(qs, checkedQs)) {
      nextHands.push(h);
    }
  }
  for (const k in stats) {
    const v = stats[k];
    $(`#${tab}_${k}_meter`).val(v * 1000 / count);
    $(`#${tab}_${k}_percent`).text((v * 100 / count).toFixed(1) + '%');
  }
  $(`#${tab}_combos`).text(nextHands.length);
  $(`#${tab}_combos_percent`).text(
      (nextHands.length / count * 100).toFixed(1) + '%');
  displayCombos(tab, nextHands);
  return nextHands;
};


let handsPre = [];
let handsTurn = [];
let handsRiver = [];
let handsShowdown = [];
const updateWithBoard = function(id) {
  const hands = rangeutils.getHands(id);
  handsPre = [];
  handsTurn = [];
  handsRiver = [];
  handsShowdown = [];
  const board = getBoard();
  const holeCards = getHole();
  const exclusions = new Set(holeCards);
  for (const h of hands) {
    if (!(exclusions.has(h[0]) || exclusions.has(h[1]))) {
      handsPre.push(h);
    }
  }
  const flop = board[0] !== 'empty' &&
      board[1] !== 'empty' &&
      board[2] !== 'empty';
  const turn = flop && board[3] !== 'empty';
  const river = turn && board[4] !== 'empty';
  if (flop && hands.length > 0) {
    handsTurn = setStats('flop', hands, board.slice(0, 3), holeCards);
  } else {
    resetStats('flop');
  }
  if (turn && handsTurn.length > 0) {
    handsRiver = setStats('turn', handsTurn, board.slice(0, 4), holeCards);
  } else {
    resetStats('turn');
  }
  if (river && handsRiver.length > 0) {
    return handsShowdown = setStats('river', handsRiver, board, holeCards);
  } else {
    return resetStats('river');
  }
};


const resetStats = function(tab) {
  for (const q of METERS) {
    $(`#${tab}_${q}_meter`).val(0);
    $(`#${tab}_${q}_percent`).text(0..toFixed(1) + '%');
  }
  $(`#${tab}_combos_all`).empty();
};


const fillTabs = function() {
  for (const tab of ['preflop', 'flop', 'turn', 'river']) {
    let handtype = 'made';
    for (const q of QUALIFIERS) {
      if (q === 'straightflush') {
        $(`#${tab}_body`).append(
            '<tr><td colspan=4><i>Made Hands</i></td></tr>');
      } else if (q === 'flushdraw') {
        handtype = 'draw';
        $(`#${tab}_body`).append('<tr><td colspan=4><i>Draws</i></td></tr>');
      }
      let row = $('<tr></tr>');
      if (tab === 'preflop') {
        row.append('<td style="width: 13px"></td>');
      } else if (
        (tab === 'river' && handtype === 'draw') ||
          (tab === 'turn' && q === 'backdoorflushdraw')
      ) {
        row.append(
            $('<td style="width: 13px"></td>').append(
                $(`<input type='checkbox' id='${tab}_${q}_box'>`)
                    .change(parentboxUpdate),
            ),
        );
      } else {
        row.append(
            $('<td style="width: 13px"></td>').append(
                $(`<input type='checkbox' id='${tab}_${q}_box' checked>`)
                    .change(parentboxUpdate),
            ),
        );
      }
      // eslint-disable-next-line max-len
      row.append(`<td class='pl-1 pr-xl-3 stats_hand_qualifier'>${QUALIFIER_DISPLAY[q]}</td>`)
          // eslint-disable-next-line max-len
          .append(`<td id='${tab}_${q}_percent' class='stats_hand_percent'>0.0%</td>`)
          // eslint-disable-next-line max-len
          .append(`<td class='stats_hand_meter'><meter id='${tab}_${q}_meter' value=0 min=0 max=1000 style='width: 100%'></meter></td>`);
      $(`#${tab}_body`).append(row);
      if (q in SUBQUALIFIERS) {
        for (const sq of SUBQUALIFIERS[q]) {
          row = $('<tr class="subqualifier"></tr>');
          if (tab === 'preflop') {
            row.append('<td style="width: 13px"></td>');
            // eslint-disable-next-line max-len
            row.append(`<td class='pl-3 pr-xl-3 stats_hand_qualifier'>${QUALIFIER_DISPLAY[sq]}</td>`)
                // eslint-disable-next-line max-len
                .append(`<td id='${tab}_${sq}_percent' class='stats_hand_percent'>0.0%</td>`)
                // eslint-disable-next-line max-len
                .append(`<td class='stats_hand_meter'><meter id='${tab}_${sq}_meter' value=0 min=0 max=1000 style='width: 100%'></meter></td>`);
          } else if (tab === 'river' && handtype === 'draw') {
            row.append('<td style="width: 13px"></td>');
            // eslint-disable-next-line max-len
            row.append(
                // eslint-disable-next-line max-len
                $(`<td class='pr-xl-3 stats_hand_qualifier'>&nbsp;&nbsp;${QUALIFIER_DISPLAY[sq]}</td>`)
                    .prepend(
                        // eslint-disable-next-line max-len
                        $(`<input type='checkbox' id='${tab}_${sq}_box' class='${tab}_${q}_subqualifier'>`)
                            .change(childboxUpdate),
                    ),
            )
                // eslint-disable-next-line max-len
                .append(`<td id='${tab}_${sq}_percent' class='stats_hand_percent'>0.0%</td>`)
                // eslint-disable-next-line max-len
                .append(`<td class='stats_hand_meter'><meter id='${tab}_${sq}_meter' value=0 min=0 max=1000 style='width: 100%'></meter></td>`);
          } else {
            row.append('<td style="width: 13px"></td>');
            row.append(
                // eslint-disable-next-line max-len
                $(`<td class='pr-xl-3 stats_hand_qualifier'>&nbsp;&nbsp;${QUALIFIER_DISPLAY[sq]}</td>`)
                    .prepend(
                        // eslint-disable-next-line max-len
                        $(`<input type='checkbox' id='${tab}_${sq}_box' class='${tab}_${q}_subqualifier' checked>`)
                            .change(childboxUpdate),
                    ),
            )
                // eslint-disable-next-line max-len
                .append(`<td id='${tab}_${sq}_percent' class='stats_hand_percent'>0.0%</td>`)
                // eslint-disable-next-line max-len
                .append(`<td class='stats_hand_meter'><meter id='${tab}_${sq}_meter' value=0 min=0 max=1000 style='width: 100%'></meter></td>`);
          }
          $(`#${tab}_body`).append(row);
        }
      }
    }
  }
};


const parentboxUpdate = function(e) {
  const q = e.target.id.slice(0, -4);
  if ($(e.target).prop('checked')) {
    $(`.${q}_subqualifier`).prop('checked', $(e.target).prop('checked'));
  }
  updateStats();
};


const childboxUpdate = function(e) {
  const q = $(e.target).attr('class');
  let anyChecked = false;
  let allChecked = true;
  $(`.${q}`).each((i, e) => {
    anyChecked = anyChecked || $(e).prop('checked');
    allChecked = allChecked && $(e).prop('checked');
  });
  if (allChecked) {
    $(`#${q.slice(0, -13)}_box`).prop('checked', true);
  } else if (anyChecked) {
    $(`#${q.slice(0, -13)}_box`).prop('checked', false);
  } else {
    $(`#${q.slice(0, -13)}_box`).prop('checked', false);
  }
  updateStats();
};


const createLayout = function() {
  const rangeSelector = rangeutils.buildRange('Range', 0);
  rangeSelector.addClass('mx-auto');
  $('#player_0').replaceWith(rangeSelector);
  fillTabs();
};


const chooseRandomBoard = function() {
  cardutils.setCardRandom('board1');
  cardutils.setCardRandom('board2');
  cardutils.setCardRandom('board3');
  cardutils.setCardRandom('board4');
  cardutils.setCardRandom('board5');
  return updateStats(0);
};


const clearBoard = function() {
  cardutils.resetCard('board1');
  cardutils.resetCard('board2');
  cardutils.resetCard('board3');
  cardutils.resetCard('board4');
  cardutils.resetCard('board5');
  return updateStats(0);
};


window.cardUpdate = function(id) {
  return updateStats(0);
};


window.rangeUpdate = function(id) {
  return updateStats(0);
};


const comboHand = function(combo) {
  if (combo[0][0] === combo[1][0]) {
    return [combo[0][0] + combo[1][0], 2];
  } else if (combo[0][1] === combo[1][1]) {
    return [combo[0][0] + combo[1][0] + 's', 3];
  } else {
    return [combo[0][0] + combo[1][0] + 'o', 1];
  }
};


const updateSelection = function() {
  let combos;
  if (activeTab === 'nav-preflop-tab') {
    for (const c of COMBOS_ORDERED) {
      $(`#0_${c}`).css('background', '');
    }
    return;
  } else if (activeTab === 'nav-flop-tab') {
    combos = handsTurn;
  } else if (activeTab === 'nav-turn-tab') {
    combos = handsRiver;
  } else {
    combos = handsShowdown;
  }

  const activeHands = {};
  for (const c of combos) {
    const hcount = comboHand(c);
    const h = hcount[0];
    const count = hcount[1];
    if (h in activeHands) {
      activeHands[h] += count;
    } else {
      activeHands[h] = count;
    }
  }

  for (const c of COMBOS_ORDERED) {
    if (c in activeHands) {
      const percent = activeHands[c] / 12 * 100;
      // eslint-disable-next-line max-len
      $(`#0_${c}`).css('background', `linear-gradient(to right, limegreen ${percent}%, lightgreen ${percent}%)`);
    } else {
      $(`#0_${c}`).css('background', '');
    }
  }
};


const reportError = function(message) {
  // eslint-disable-next-line max-len
  const error = $('<div class="alert alert-danger alert-dismissible fade show" role="alert"></div>')
      .append(message)
      // eslint-disable-next-line max-len
      .append('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
  return $('#simulation_errors').prepend(error);
};


const calcEquity = function(event) {
  if (!event.detail || event.detail === 1) {
    $('#preflop_equity').text('-');
    $('#flop_equity').text('-');
    $('#turn_equity').text('-');
    $('#river_equity').text('-');
    const hand = getHole();
    if (hand[0] === 'empty' || hand[1] === 'empty') {
      reportError('Missing <strong>Hole Cards</strong>');
      return;
    }
    if (handsPre.length === 0) {
      reportError('No hands in <strong>Range</strong>');
      return;
    }
    const board = getBoard();
    const flop = board[0] !== 'empty' &&
        board[1] !== 'empty' &&
        board[2] !== 'empty';
    const turn = flop && board[3] !== 'empty';
    const river = turn && board[4] !== 'empty';
    $('#calc_equity').prepend(
        // eslint-disable-next-line max-len
        $('<span id="equity_spinner" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>'),
    );
    $('#calc_equity').attr('disabled', true);

    setTimeout(() => {
      let equity = equityutils.approximateHandRangeEquity(
          hand, handsPre, 10000);
      $('#preflop_equity').text('~' + (equity[0] * 100).toFixed(1) + '%');
      if (flop) {
        equity = equityutils.calculateHandRangeEquity(
            hand, handsTurn, board.slice(0, 3));
        $('#flop_equity').text((equity[0] * 100).toFixed(1) + '%');
      }
      if (turn) {
        equity = equityutils.calculateHandRangeEquity(
            hand, handsRiver, board.slice(0, 4));
        $('#turn_equity').text((equity[0] * 100).toFixed(1) + '%');
      }
      if (river) {
        equity = equityutils.calculateHandRangeEquity(
            hand, handsShowdown, board);
        $('#river_equity').text((equity[0] * 100).toFixed(1) + '%');
      }
      $('#equity_spinner').remove();
      $('#calc_equity').attr('disabled', false);
    }, 100);
  }
};


const tabUpdate = function() {
  activeTab = $(this).attr('id');
  return updateSelection();
};

let activeTab = 'nav-preflop-tab';

$('#calc_equity').click(calcEquity);
$('#nav-preflop-tab').click(tabUpdate);
$('#nav-flop-tab').click(tabUpdate);
$('#nav-turn-tab').click(tabUpdate);
$('#nav-river-tab').click(tabUpdate);

rangeutils.loadRanges();

createLayout();

const c1 = cardutils.makeHiddenCard(55).attr({
  id: 'board1',
  tabindex: '0',
}).css('margin', '0px 5px 0px 0px').addClass('ml-auto');
cardutils.addCardSelect(c1);

const c2 = cardutils.makeHiddenCard(55).attr({
  id: 'board2',
  tabindex: '0',
}).css('margin', '0px 5px 0px 0px');
cardutils.addCardSelect(c2);

const c3 = cardutils.makeHiddenCard(55).attr({
  id: 'board3',
  tabindex: '0',
}).css('margin', '0px 12px 0px 0px');
cardutils.addCardSelect(c3);

const c4 = cardutils.makeHiddenCard(55).attr({
  id: 'board4',
  tabindex: '0',
}).css('margin', '0px 12px 0px 0px');
cardutils.addCardSelect(c4);

const c5 = cardutils.makeHiddenCard(55).attr({
  id: 'board5',
  tabindex: '0',
}).css('margin', '0px 0px 0px 0px').addClass('mr-auto');
cardutils.addCardSelect(c5);

$('#board').append(c1, c2, c3, c4, c5);

const h1 = cardutils.makeHiddenCard(55).attr({
  id: 'hole1',
  tabindex: '0',
}).css('margin', '0px 5px 0px 0px').addClass('ml-auto');
cardutils.addCardSelect(h1);

const h2 = cardutils.makeHiddenCard(55).attr({
  id: 'hole2',
  tabindex: '0',
}).css('margin', '0px 0px 0px 0px');
cardutils.addCardSelect(h2);

$('#hole_cards').prepend(h1, h2);

$('#random_board').click(chooseRandomBoard);
$('#clear_board').click(clearBoard);

$('#flop_combos_all').on('shown.bs.collapse', updateStats);
$('#turn_combos_all').on('shown.bs.collapse', updateStats);
$('#river_combos_all').on('shown.bs.collapse', updateStats);
