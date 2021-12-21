var = "UNI"

listOfVars=["WBTC","UNI","DAI","ENJ","USDC","GUSD","RAI","CRV","BAL","PAX","FRAX","REN","BAT","TUSD","DPI","LINK","MANA","WETH","AAVE","AMPL","ZRX","SNX","KNC","MKR","USDP","YFI","BUSD","USDT","SUSD","RENFIL","XSUSHI"]
finalString = ""
for var in listOfVars:
    with open("template.txt", "r") as template:
        #print(template.read())
        templateText = template.read()
        templateTextNew = templateText.replace("ENJ", var)
        finalString += templateTextNew
print (finalString)

finalString = ""

for var in listOfVars:
    finalString += "left join "
    finalString += var 
    finalString += " on "
    finalString += var
    finalString += ".ddate=eddate\n"
  
