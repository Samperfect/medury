var stateNames = {
    'SS': '-- Select a State --',
    'CA': 'California',
    'FL': 'Florida',
    'IL': 'Illinois',
    'ID': 'Idaho',
    'MI': 'Michigan',
    'NM': 'New Mexico',
    'NY': 'New York',
    'OH': 'Ohio',
    'PR': 'Puerto Rico',
    'SC': 'South Carolina',
    'TX': 'Texas',
    'UT': 'Utah',
    'VA': 'Virginia',
    'WA': 'Washington',
    'WI': 'Wisconsin'
};

var statePlanOptions = {
    'SS': ['-- Select a Plan --'],
    'CA': ['-- Select a Plan --', 'Medicaid', 'Marketplace', 'Medicare', 'Duals'],
    'FL': ['-- Select a Plan --', 'Medicaid', 'Marketplace', 'Medicare'],
    'IL': ['-- Select a Plan --', 'Medicaid', 'Duals'],
    'ID': ['-- Select a Plan --', 'Medicare'],
    'MI': ['-- Select a Plan --', 'Medicaid', 'Marketplace', 'Medicare', 'Duals'],
    'NM': ['-- Select a Plan --', 'Medicaid', 'Marketplace', 'Medicare'],
    'NY': ['-- Select a Plan --', 'Essential Plan', 'Medicaid/Molina Healthcare PLUS/CHPlus'],
    'OH': ['-- Select a Plan --', 'Medicaid', 'Marketplace', 'Medicare', 'Duals'],
    'PR': ['-- Select a Plan --', 'Medicaid'],
    'SC': ['-- Select a Plan --', 'Medicaid', 'Duals'],
    'TX': ['-- Select a Plan --', 'Medicaid', 'Marketplace', 'Medicare', 'Duals'],
    'UT': ['-- Select a Plan --', 'Medicaid', 'Marketplace', 'Medicare'],
    'VA': ['-- Select a Plan --', 'Medicare'],
    'WA': ['-- Select a Plan --', 'Medicaid', 'Marketplace', 'Medicare'],
    'WI': ['-- Select a Plan --', 'Medicaid', 'Marketplace', 'Medicare']
};

var FindaProviderData = {
    'NY_Medicaid/Molina Healthcare PLUS/CHPlus': [
        ['Medicaid, Molina Healthcare PLUS (HARP) and CHPlus Provider Directory', '../pdfdocs/5856503_NY_Medicaid_Provider_Directory.pdf'],
    ],
    'NY_Essential Plan': [
        ['Essential Plan Provider Directory', '../pdfdocs/EP_Provider_Directory_NY.PDF'],        
    ],
    'ID_Medicare': [
        ['Molina Medicare Options HMO Kootenai and Twin Falls (English & Español)', '../pdfdocs/PDListing_MA_ID010.pdf'],
        ['Molina Medicare Options HMO Ada and Canyon (English & Español)', '../pdfdocs/PDListing_MA_ID009.pdf'],
        ['Molina Medicare Options Plus (English & Español)', '../pdfdocs/PDListing_MA_ID008.pdf'],        
    ],
    'WA_Medicaid': [
        ['Eastern Washington Medicaid Specialist Directory June 2017', '../pdfdocs/Eastern%20Washington%20Medicaid%20Primary%20Care%20Provider%20(PCP)%20Directory%20June%202017.pdf'],
        ['Hospital Directory Medicaid June 2017', '../pdfdocs/Eastern%20Washington%20Medicaid%20Specialist%20Directory%20June%202017.pdf'],
        ['Western Washington Medicaid Primary Care Provider (PCP) Directory June 2017', '../pdfdocs/Hospital%20Directory%20Medicaid%20June%202107.pdf'],
        ['Western Washington Medicaid Specialist Directory June 2017', '../pdfdocs/Western Washington Medicaid Primary Care Provider (PCP) Directory June 2017.pdf'],
    ],
    'WA_Marketplace': [
        ['Washington Marketplace Provider Directory May 2017', '../pdfdocs/Washington_Marketplace_Directory_May_ 2017.pdf'],
    ],
    'WA_Medicare': [
        ['Eastern Washington Medicaid Specialist Directory June 2017', '../pdfdocs/Eastern Washington Medicaid Primary Care Provider (PCP) Directory%20June%202017.pdf'],
        ['Hospital Directory Medicaid June 2017', '../pdfdocs/Eastern%20Washington%20Medicaid%20Specialist%20Directory%20June%202017.pdf'],
        ['Western Washington Medicaid Primary Care Provider (PCP) Directory June 2017', '../pdfdocs/Hospital%20Directory%20Medicaid%20June%202107.pdf'],
        ['Western Washington Medicaid Specialist Directory June 2017', '../pdfdocs/Western%20Washington%20Medicaid%20Primary%20Care%20Provider%20(PCP)%20Directory%20June%202017.pdf'],
    ],
    'CA_Medicaid':[
        ['Imperial County Provider Directory', '../pdfdocs/Imperial-County-Provider-Directory.pdf'],
        ['Riverside and San Bernardino Provider Directory','../pdfdocs/Riverside-and-San-Bernardino-Provider-Directory.pdf'],
        ['Sacramento Provider Directory','../pdfdocs/Sacramento-Provider-Directory.pdf'],
        ['San Diego Provider Directory','../pdfdocs/San-Diego-Provider-Directory.pdf']
    ],
    'CA_Duals':[
        ['Molina Dual Options Cal Medi-Connect Plan Medicare-Medicaid Plan - Los Angeles (English &amp; Español)','../pdfdocs/Duals/PDListing_MMP_CA_LA.pdf'],
        ['Molina Dual Options Cal Medi-Connect Plan Medicare-Medicaid Plan - Los Angeles (دليل موفري الرعاية والصيدليات)','../pdfdocs/Duals/PDListing_MMP_CA_LA_Arabic.pdf'],
        ['Molina Dual Options Cal Medi-Connect Plan Medicare-Medicaid Plan - Los Angeles (Մատակարարների և դեղատների ուղեցույց )','../pdfdocs/Duals/PDListing_MMP_CA_LA_Armenian.pdf'],
        ['Molina Dual Options Cal Medi-Connect Plan Medicare-Medicaid Plan - Los Angeles (បញ្ជីរាយឈ្មោះអ្នកផ្តល់សេវា និងឱសថស្ថាន)','../pdfdocs/Duals/PDListing_MMP_CA_LA_Cambodian.pdf'],
        ['Molina Dual Options Cal Medi-Connect Plan Medicare-Medicaid Plan - Los Angeles (提供者和藥房名錄)','../pdfdocs/Duals/PDListing_MMP_CA_LA_Chinese.pdf'],
        ['Molina Dual Options Cal Medi-Connect Plan Medicare-Medicaid Plan - Los Angeles (فهرست ارائه دهندگان و داروخانه‌ها)','../pdfdocs/Duals/PDListing_MMP_CA_LA_Farsi.pdf'],
        ['Molina Dual Options Cal Medi-Connect Plan Medicare-Medicaid Plan - Los Angeles (공급자 및 약국 목록 )','../pdfdocs/Duals/PDListing_MMP_CA_LA_Korean.pdf'],
        ['Molina Dual Options Cal Medi-Connect Plan Medicare-Medicaid Plan - Los Angeles (КАТАЛОГ МЕДИЦИНСКИХ СПЕЦИАЛИСТОВ И АПТЕК )','../pdfdocs/Duals/PDListing_MMP_CA_LA_Russian.pdf'],
        ['Molina Dual Options Cal Medi-Connect Plan Medicare-Medicaid Plan - Los Angeles (DIREKTORYO NG TAGAPAGBIGAY NG SERBISYO AT PARMASYA)','../pdfdocs/Duals/PDListing_MMP_CA_LA_Tagalog.pdf'],
        ['Molina Dual Options Cal Medi-Connect Plan Medicare-Medicaid Plan - Los Angeles (DANH BẠ NHÀ CUNG CẤP VÀ NHÀ THUỐC)','../pdfdocs/Duals/PDListing_MMP_CA_LA_Vietnamese.pdf'],
        ['Molina Dual Options Cal Medi-Connect Plan Medicare-Medicaid Plan - Riverside, San Bernardino, San Diego (English &amp; Español)','../pdfdocs/Duals/PDListing_MMP_CA_RivSBSD.pdf'],
        ['Molina Dual Options Cal Medi-Connect Plan Medicare-Medicaid Plan - Riverside, San Bernardino, San Diego (دليل موفري الرعاية والصيدليات )','../pdfdocs/Duals/PDListing_MMP_CA_RivSBSD_Arabic.pdf'],
        ['Molina Dual Options Cal Medi-Connect Plan Medicare-Medicaid Plan - Riverside, San Bernardino, San Diego (DIREKTORYO NG TAGAPAGBIGAY NG SERBISYO AT PARMASYA)','../pdfdocs/Duals/PDListing_MMP_CA_RivSBSD_Tagalog.pdf'],
        ['Molina Dual Options Cal Medi-Connect Plan Medicare-Medicaid Plan - Riverside, San Bernardino, San Diego (DANH BẠ NHÀ CUNG CẤP VÀ NHÀ THUỐC )','../pdfdocs/Duals/PDListing_MMP_CA_RivSBSD_Vietnamese.pdf']
    ],
    'CA_Medicare':[
        ['Molina Medicare Options Plus Sacramento (English &amp; Español)','../pdfdocs/Medicare/PDListing_MA_CA_Sac.pdf'],
        ['Molina Medicare Options Plus SoCal (English &amp; Español)','../pdfdocs/Medicare/PDListing_MA_CA_SoCal.pdf']
    ],
    'CA_Marketplace':[
        ['Provider Directory for Riverside and San Bernardino Counties','../pdfdocs/CA_IE_EN_Marketplace_2017-05.pdf'],
        ['Provider Directory for Imperial County','../pdfdocs/CA_IM_EN_Marketplace_2017-05.pdf'],
        ['Provider Directory for Los Angeles County','../pdfdocs/CA_LA_EN_Marketplace_2017-05.pdf'],
        ['Provider Directory for Orange County','../pdfdocs/CA_OC_EN_Marketplace_2017-05.pdf'],
        ['Provider Directory for San Diego County','../pdfdocs/CA_SD_EN_Marketplace_2017-05.pdf']
    ],
    'FL_Medicare':[
        ['Molina Medicare Options Plus (English &amp; Español)','../pdfdocs/Medicare/PDListing_MA_FL.pdf']
    ],  
    'FL_Medicaid':[
        ['47368HR FLCommPlusLTC 0309 COMBO','../pdfdocs/47368HR_FLCommPlusLTC_0309%20COMBO.pdf'],
        ['Region 1 Provider Directory - Escambia, Santa Rosa, Okaloosa, Walton','../pdfdocs/4788506%20Q1%20FLRegion%201%20021117%20COMBO.pdf'] ,
        ['Region 4 Provider Directory - Baker, Clay, Duval, Flagler, Nassau, St. Johns, and Volusia Counties','../pdfdocs/4788509%20Q1%20FL%20Region%204_021417%20COMBO.pdf'],
        ['Region 6 Provider Directory - Hardee, Highlands, Hillsborough, Manatee &amp; Polk','../pdfdocs/4788511%20Q1%20FL%20Region%206%20_021217%20COMBO.pdf'],
        ['Region 7 Provider Directory - Brevard, Orange, Osceola &amp; Seminole Counties','../pdfdocs/4788512%20Q1%20FL%20Region%207%20_021217%20COMBO.pdf'],
        ['Region 8 Provider Directory - Charlotte, Collier, Desoto, Glades, Hendry, Lee, Sarasota Counties','../pdfdocs/4788513%20Q1%20FL%20Region%208_021117.COMBO%20pdf.pdf'],
        ['Region 9 Provider Directory - Palm Beach County','../pdfdocs/4788514%20Q1%20FL%20Region%209_021317%20COMBO.pdf'],
        ['Region 11 Provider Directory - Miami Dade County','../pdfdocs/4788562%20Q1%20FL%20Region%2011_P2_021617.COMBOpdf.pdf']
    ],
    'FL_Marketplace':[
        ['Florida Marketplace Directory May 2017','../pdfdocs/Florida_Marketplace_Directory_May_%202017.pdf']
    ],
    'IL_Duals':[
        ['Molina Dual Options Medicare-Medicaid Plan (English &amp; Español)','../pdfdocs/Duals/PDListing_MMP_IL.pdf']
    ],
    'IL_Medicare':[
        ['Coming Soon..','#']
    ],
    'IL_Medicaid':[
        ['Coming Soon..','#']
    ],
    'IL_Marketplace':[
        ['Coming Soon..','#']
    ],
    'MI_Medicare':[
        ['Molina Medicare Options Plus (English &amp; Español)','../pdfdocs/Medicare/PDListing_MA_MI.pdf'],    
    ],
    'MI_Medicaid':[
        ['MI Medicaid Provider Directory','../pdfdocs/MI-Medicaid-Provider-Directory.pdf']    
    ],
    'MI_Marketplace':[
        ['Michigan Marketplace Provider Directory May 2017','../pdfdocs/Michigan_Directory_May_2017.pdf']  
    ],
    'MI_Duals':[
      ['Molina Dual Options MI Health Link Medicare-Medicaid Plan (English &amp; Español)','../pdfdocs/Duals/PDListing_MMP_MI_EN%20SP.pdf'],
      ['Molina Dual Options MI Health Link Medicare-Medicaid Plan (دليل موفري الرعاية والصيدليات)','../pdfdocs/Duals/PDListing_MMP_MI_Arabic.pdf']
    ],
    'NM_Medicare':[
        ['Molina Medicare Options Plus (English &amp; Español)','../pdfdocs/Medicare/PDListing_MA_NM.pdf'],
    ],
    'NM_Medicaid':[
        ['Coming Soon..','#']
    ],
    'NM_Marketplace':[
        ['New Mexico Marketplace Provider Directory May 2017','../pdfdocs/New_Mexico_Marketplace_Directory_May_2017.pdf']
    ],
    'OH_Duals':[
        ['Molina Dual Options MyCare Ohio Medicare-Medicaid Plan (English &amp; Español)','../pdfdocs/Duals/PDListing_MMP_OH.pdf']
    ],
    'OH_Medicare':[
        ['Molina Medicare Options Plus (English &amp; Español)','../pdfdocs/Medicare/PDListing_MA_OH.pdf']
    ],
    'OH_Medicaid':[
        ['Ohio Medicaid Provider Directory - West Region','../pdfdocs/Ohio%20Medicaid%20Provider%20Directory%20-%20West%20Region.pdf'],
        ['Ohio Medicaid Provider Directory - Northeast Region','../pdfdocs/Ohio%20Medicaid%20Provider%20Directory%20-%20Northeast%20Region.pdf'],
        ['Ohio Medicaid Provider Directory - Central &amp; Southeast Region','../pdfdocs/Ohio%20Medicaid%20Provider%20Directory%20-%20Central%20and%20Southeast%20Region.pdf']
    ],
    'OH_Marketplace':[
        ['Ohio Marketplace Provider Directory May 2017','../pdfdocs/Ohio_Marketplace_Directory_May_2017.pdf']
    ],
    'PR_Duals':[
        ['Coming Soon..','#']
    ],
    'PR_Medicare':[
        ['Coming Soon..','#']
    ],
    'PR_Medicaid':[
        ['Coming Soon..','#']
    ],
    'PR_Marketplace':[
        ['Coming Soon..','#']
    ],
    'SC_Duals':[
        ['Molina Dual Options Medicare-Medicaid Plan (English &amp; Español)','../pdfdocs/Duals/PDListing_MMP_SC.pdf']
    ],
    'SC_Medicare':[
        ['Coming Soon..','#']
    ],
    'SC_Medicaid':[
        ['SC PeeDee Provider Directory','../pdfdocs/SC-PeeDee-Provider-Directory.pdf'],
        ['SC Upstate Provider Directory','../pdfdocs/SC-Upstate-Provider-Directory.pdf'],
        ['SC LowCountry Provider Directory','../pdfdocs/SC-LowCountry-Provider-Directory.pdf'],
        ['SC Midlands Provider Directory','../pdfdocs/SC-Midlands-Provider-Directory.pdf'],
        ['SC Aiken Provider Directory','../pdfdocs/SC-Aiken-Provider-Directory.pdf']
    ],
    'SC_Marketplace':[
        ['Coming Soon..','#']
    ],
    'TX_Duals': [
        ['Molina Dual Options STAR+PLUS Medicare-Medicaid Plan (English &amp;Español)','../pdfdocs/Duals/PDListing_MMP_TX.pdf']
    ],
    'TX_Medicare': [
        ['Molina Medicare Options Plus (East) (English &amp; Español)', '../pdfdocs/Medicare/PDListing_MA_TXEast.pdf'],
        ['Molina Medicare Options Plus (West) (English &amp; Español)', '../pdfdocs/Medicare/PDListing_MA_TXWest.pdf']
    ],
    'TX_Medicaid': [
        ['TX RSA Central P2 2017', '../pdfdocs/TX-RSA-Central-P2-2017.pdf'],
        ['TX RSA East P2 2017', '../pdfdocs/TX-RSA-East-P2-2017.pdf'],
        ['TX RSA North P2 2017', '../pdfdocs/TX-RSA-North-P2-2017.pdf'],
        ['TX RSA South P1 2017', '../pdfdocs/TX-RSA-South-P1-2017.pdf'],
        ['TX Star Dallas 2017', '../pdfdocs/TX-Star-Dallas-2017.pdf'],
        ['TX Star ElPaso 2017', '../pdfdocs/TX-Star-ElPaso-2017.pdf'],
        ['TX Star Harris 2017', '../pdfdocs/TX-Star-Harris-2017.pdf'],
        ['TX Star Hidalgo 2017', '../pdfdocs/TX-Star-Hidalgo-2017.pdf'],
        ['TX Star Jeff 2017', '../pdfdocs/TX-Star-Jeff-2017.pdf'],
        ['TX Chip Dallas P2 2017', '../pdfdocs/TX-Chip-Dallas-P2-2017.pdf'],
        ['TX CHIP Harris 2017', '../pdfdocs/TX-CHIP-Harris-2017.pdf'],
        ['TX Chip Jeff 2017', '../pdfdocs/TX-Chip-Jeff-2017.pdf'],
        ['TX SP Bexar Web 2017', '../pdfdocs/TX-SP-Bexar-Web-2017.pdf'],
        ['TX SP Dallas Web P1 2017', '../pdfdocs/TX-SP-Dallas-Web-P1-2017.pdf'],
        ['TX SP ElPaso Web P1 2017', '../pdfdocs/TX-SP-ElPaso-Web-P1-2017.pdf'],
        ['TX SP Harris Web P1 2017', '../pdfdocs/TX-SP-Harris-Web-P1-2017.pdf'],
        ['TX SP Hidalgo Web P1 2017', '../pdfdocs/TX-SP-Hidalgo-Web-P1-2017.pdf'],
        ['TX SP Jefferson Web P1 2017', '../pdfdocs/TX-SP-Jefferson-Web-P1-2017.pdf']
        ],
    'TX_Marketplace': [
        ['Texas Consumer Choice Provider Directory May 2017', '../pdfdocs/Texas_Consumer_Choice_Directory_May_2017.pdf'],
        ['Texas Options Plans Provider Directory May 2017', '../pdfdocs/Texas_Options_Plans_Directory_May_2017.pdf'],
        ['Texas Standard Plans Provider Directory May 2017', '../pdfdocs/Texas_Standard_Plans_Directory_May_2017.pdf']
    ],
    'UT_Duals': [
        ['Coming Soon..', '#']
    ],
    'UT_Medicare': [
        ['Molina Medicare Options Plus (English &amp; Español)', '../pdfdocs/Medicare/PDListing_MA_UT.pdf'],
        ['Healthy Advantage (English &amp; Español)', '../pdfdocs/Medicare/PDListing_MA_UT_HealthyAdvantage.pdf'],
        ['Healthy Advantage Plus (English &amp; Español)', '../pdfdocs/Medicare/PDListing_MA_UT_HealthyAdvantagePlus.pdf']
    ],
    'UT_Medicaid': [
        ['UT Medicaid Provider Directory', '../pdfdocs/UT-Medicaid-Provider-Directory.pdf']
    ],
    'UT_Marketplace': [
        ['Utah Marketplace Provider Directory May 2017', '../pdfdocs/Utah_Marketplace_Directory_May_%202017.pdf']
    ],
    'VA_Duals': [
        ['Coming Soon..', '#']
    ],
    'VA_Medicare': [
        ['Molina Medicare Options Plus (English &amp; Español)', '../pdfdocs/Medicare/PDListing_MA_VA.pdf']
    ],
    'VA_Medicaid': [
        ['Coming Soon..', '#']
    ],
    'VA_Marketplace': [
        ['Coming Soon..', '#']
    ],
    'WI_Duals': [
        ['Coming Soon..', '#']
    ],
    'WI_Medicare': [
        ['Molina Medicare Options Plus (English &amp; Español)', '../pdfdocs/Medicare/PDListing_MA_WI.pdf']
    ],
    'WI_Medicaid': [
        ['WI Medicaid Provider Directory', '../pdfdocs/WI-Medicaid-Provider-Directory.pdf']
    ],
    'WI_Marketplace': [
        ['Wisconsin Marketplace Provider Directory May 2017', '../pdfdocs/Wisconsin_Marketplace_Directory_May_%202017.pdf']
    ],
    'WA_Duals': [
        ['Coming Soon..', '#']
    ],
    'WA_Medicare': [
        ['Molina Medicare Options Plus (East) (English &amp; Español)', '../pdfdocs/Medicare/PDListing_MA_WAEast.pdf'],
        ['Molina Medicare Options Plus (West) (English &amp; Español)', '../pdfdocs/Medicare/PDListing_MA_WAWest.pdf'],
        ['Molina Medicare Choice (English &amp; Español)', '../pdfdocs/Medicare/PDListing_MA_WAChoice.pdf']
    ],
    'WA_Medicaid': [
        ['Eastern Washington Medicaid Primary Care Provider (PCP) Directory June 2017', '../pdfdocs/Eastern%20Washington%20Medicaid%20Primary%20Care%20Provider%20(PCP)%20Directory%20June%202017.pdf'],
        ['Eastern Washington Medicaid Specialist Directory June 2017', '../pdfdocs/Medicare/PDListing_MA_WAWest.pdf'],
        ['Hospital Directory Medicaid June 2017', '../pdfdocs/Hospital%20Directory%20Medicaid%20June%202107.pdf'],
        ['Western Washington Medicaid Primary Care Provider (PCP) Directory June 2017', '../pdfdocs/Western%20Washington%20Medicaid%20Primary%20Care%20Provider%20(PCP)%20Directory%20June%202017.pdf'],
        ['Western Washington Medicaid Specialist Directory June 2017', '../pdfdocs/Western%20Washington%20Medicaid%20Specialist%20Directory%20June%202017.pdf']
    ],
    'WA_Marketplace': [
        ['Washington Marketplace Provider Directory May 2017', '../pdfdocs/Washington_Marketplace_Directory_May_%202017.pdf']
    ]
};
/*
'TX_Duals'
<UL>
../pdfdocs/Duals/PDListing_MMP_TX.pdf'Molina 
Dual Options STAR+PLUS Medicare-Medicaid Plan (English &amp; 
Español)
'TX_Medicare'
<UL>
../pdfdocs/Medicare/PDListing_MA_TXEast.pdf'Molina 
Medicare Options Plus (East) (English &amp; Español)
../pdfdocs/Medicare/PDListing_MA_TXWest.pdf'Molina 
Medicare Options Plus (West) (English &amp; Español)
'TX_Medicaid'
<UL>
../pdfdocs/TX-RSA-Central-P2-2017.pdf'TX 
RSA Central P2 2017
../pdfdocs/TX-RSA-East-P2-2017.pdf'TX 
RSA East P2 2017
../pdfdocs/TX-RSA-North-P2-2017.pdf'TX 
RSA North P2 2017
../pdfdocs/TX-RSA-South-P1-2017.pdf'TX 
RSA South P1 2017
../pdfdocs/TX-Star-Dallas-2017.pdf'TX 
Star Dallas 2017
../pdfdocs/TX-Star-ElPaso-2017.pdf'TX 
Star ElPaso 2017
../pdfdocs/TX-Star-Harris-2017.pdf'TX 
Star Harris 2017
../pdfdocs/TX-Star-Hidalgo-2017.pdf'TX 
Star Hidalgo 2017
../pdfdocs/TX-Star-Jeff-2017.pdf'TX 
Star Jeff 2017
../pdfdocs/TX-Chip-Dallas-P2-2017.pdf'TX 
Chip Dallas P2 2017
../pdfdocs/TX-CHIP-Harris-2017.pdf'TX 
CHIP Harris 2017
../pdfdocs/TX-Chip-Jeff-2017.pdf'TX 
Chip Jeff 2017
../pdfdocs/TX-SP-Bexar-Web-2017.pdf'TX 
SP Bexar Web 2017
../pdfdocs/TX-SP-Dallas-Web-P1-2017.pdf' 
TX SP Dallas Web P1 2017
../pdfdocs/TX-SP-ElPaso-Web-P1-2017.pdf' 
TX SP ElPaso Web P1 2017
../pdfdocs/TX-SP-Harris-Web-P1-2017.pdf' 
TX SP Harris Web P1 2017
../pdfdocs/TX-SP-Hidalgo-Web-P1-2017.pdf' 
TX SP Hidalgo Web P1 2017
../pdfdocs/TX-SP-Jefferson-Web-P1-2017.pdf'TX 
SP Jefferson Web P1 2017
'TX_Marketplace'
<UL>
../pdfdocs/Texas_Consumer_Choice_Directory_May_2017.pdf'Texas 
Consumer Choice Provider Directory May 2017
../pdfdocs/Texas_Options_Plans_Directory_May_2017.pdf'Texas 
Options Plans Provider Directory May 2017
../pdfdocs/Texas_Standard_Plans_Directory_May_2017.pdf'Texas 
Standard Plans Provider Directory May 2017
'UT_Duals'
<UL>
#'Coming 
Soon..
'UT_Medicare'
<UL>
../pdfdocs/Medicare/PDListing_MA_UT.pdf'Molina 
Medicare Options Plus (English &amp; Español)
../pdfdocs/Medicare/PDListing_MA_UT_HealthyAdvantage.pdf'Healthy 
Advantage (English &amp; Español)
../pdfdocs/Medicare/PDListing_MA_UT_HealthyAdvantagePlus.pdf'Healthy 
Advantage Plus (English &amp; Español)
'UT_Medicaid'
<UL>
../pdfdocs/UT-Medicaid-Provider-Directory.pdf'UT 
Medicaid Provider Directory
'UT_Marketplace'
<UL>
../pdfdocs/Utah_Marketplace_Directory_May_%202017.pdf'Utah 
Marketplace Provider Directory May 2017
'VA_Duals'
<UL>
#'Coming 
Soon..
'VA_Medicare'
<UL>
../pdfdocs/Medicare/PDListing_MA_VA.pdf'Molina 
Medicare Options Plus (English &amp; Español)
'VA_Medicaid'
<UL>
#'Coming 
Soon..
'VA_Marketplace'
<UL>
#'Coming 
Soon..
'WI_Duals'
<UL>
#'Coming 
Soon..
'WI_Medicare'
<UL>
../pdfdocs/Medicare/PDListing_MA_WI.pdf'Molina 
Medicare Options Plus (English &amp; Español)
'WI_Medicaid'
<UL>
../pdfdocs/WI-Medicaid-Provider-Directory.pdf'WI 
Medicaid Provider Directory
'WI_Marketplace'
<UL>
../pdfdocs/Wisconsin_Marketplace_Directory_May_%202017.pdf'Wisconsin 
Marketplace Provider Directory May 2017
'WA_Duals'
<UL>
#'Coming 
Soon..
'WA_Medicare'
<UL>
../pdfdocs/Medicare/PDListing_MA_WAEast.pdf'Molina 
Medicare Options Plus (East) (English &amp; Español)
../pdfdocs/Medicare/PDListing_MA_WAWest.pdf'Molina 
Medicare Options Plus (West) (English &amp; Español)
../pdfdocs/Medicare/PDListing_MA_WAChoice.pdf'Molina 
Medicare Choice (English &amp; Español)
'WA_Medicaid'
<UL>
../pdfdocs/Eastern%20Washington%20Medicaid%20Primary%20Care%20Provider%20(PCP)%20Directory%20June%202017.pdf'Eastern 
Washington Medicaid Primary Care Provider (PCP) Directory June 2017
../pdfdocs/Eastern%20Washington%20Medicaid%20Specialist%20Directory%20June%202017.pdf'Eastern 
Washington Medicaid Specialist Directory June 2017
../pdfdocs/Hospital%20Directory%20Medicaid%20June%202107.pdf'Hospital 
Directory Medicaid June 2017
../pdfdocs/Western%20Washington%20Medicaid%20Primary%20Care%20Provider%20(PCP)%20Directory%20June%202017.pdf'Western 
Washington Medicaid Primary Care Provider (PCP) Directory June 2017
../pdfdocs/Western%20Washington%20Medicaid%20Specialist%20Directory%20June%202017.pdf'Western 
Washington Medicaid Specialist Directory June 2017
'WA_Marketplace'
<UL>
../pdfdocs/Washington_Marketplace_Directory_May_%202017.pdf'Washington 
Marketplace Provider Directory May 2017<!-- Ends here-->
*/