listOfVars=["WBTC","UNI","DAI","ENJ","USDC","GUSD","RAI","CRV","BAL","PAX","FRAX","REN","BAT","TUSD","DPI","LINK","MANA","WETH","AAVE","AMPL","ZRX","SNX","KNC","MKR","USDP","YFI","BUSD","USDT","SUSD","RENFIL","XSUSHI"]
finalString = ""
for var in listOfVars:
    with open("template2.txt", "r") as template:
        templateText = template.read()
        templateTextNew = templateText.replace("WBTC", var)
        finalString += templateTextNew
print (finalString)

