const runningRecords = {
    "Women": {
        "1-34": {"5000m": 840, "10000m": 1734, "Half Marathon": 3772, "Marathon": 7796},
        "W35": {"5000m": 873, "10000m": 1830, "Half Marathon": 3853, "Marathon": 8221},
        "W40": {"5000m": 904, "10000m": 1885, "Half Marathon": 4072, "Marathon": 8392},
        "W45": {"5000m": 955, "10000m": 1954, "Half Marathon": 4140, "Marathon": 8494},
        "W50": {"5000m": 1011, "10000m": 2105, "Half Marathon": 4518, "Marathon": 9065},
        "W55": {"5000m": 1049, "10000m": 2206, "Half Marathon": 4778, "Marathon": 9951},
        "W60": {"5000m": 1070, "10000m": 2258, "Half Marathon": 4893, "Marathon": 10185},
        "W65": {"5000m": 1161, "10000m": 2397, "Half Marathon": 5152, "Marathon": 10888},
        "W70": {"5000m": 1256, "10000m": 2665, "Half Marathon": 5400, "Marathon": 12470},
        "W75": {"5000m": 1361, "10000m": 2813, "Half Marathon": 6368, "Marathon": 13191},
        "W80": {"5000m": 1540, "10000m": 3106, "Half Marathon": 7459, "Marathon": 15105},
        "W85": {"5000m": 1658, "10000m": 5175, "Half Marathon": 7957, "Marathon": 18866}
    },
    "Men": {
        "1-34": {"5000m": 755, "10000m": 1571, "Half Marathon": 3402, "Marathon": 7235},
        "M35": {"5000m": 773, "10000m": 1611, "Half Marathon": 3547, "Marathon": 7269},
        "M40": {"5000m": 786, "10000m": 1669, "Half Marathon": 3669, "Marathon": 7455},
        "M45": {"5000m": 851, "10000m": 1779, "Half Marathon": 3688, "Marathon": 8056},
        "M50": {"5000m": 891, "10000m": 1848, "Half Marathon": 3983, "Marathon": 8369},
        "M55": {"5000m": 929, "10000m": 1911, "Half Marathon": 4223, "Marathon": 8645},
        "M60": {"5000m": 952, "10000m": 2012, "Half Marathon": 4291, "Marathon": 9002},
        "M65": {"5000m": 996, "10000m": 2082, "Half Marathon": 4585, "Marathon": 9717},
        "M70": {"5000m": 1089, "10000m": 2215, "Half Marathon": 4764, "Marathon": 10459},
        "M75": {"5000m": 1147, "10000m": 2365, "Half Marathon": 5366, "Marathon": 11094},
        "M80": {"5000m": 1220, "10000m": 2559, "Half Marathon": 5939, "Marathon": 11754},
        "M85": {"5000m": 1431, "10000m": 3067, "Half Marathon": 6647, "Marathon": 14198}
    }
};

// Estimated average times (these should be adjusted based on actual data)
const averageTimes = {
    "Men": { "5000m": 1500, "10000m": 3000, "Half Marathon": 4500, "Marathon": 12000 },
    "Women": { "5000m": 1600, "10000m": 3200, "Half Marathon": 4700, "Marathon": 12500 }
};
