import random

listOfVars=["WBTC","UNI","DAI","ENJ","USDC","GUSD","RAI","CRV","BAL","PAX","FRAX","REN","BAT","TUSD","DPI","LINK","MANA","WETH","AAVE","AMPL","ZRX","SNX","KNC","MKR","USDP","YFI","BUSD","USDT","SUSD","RENFIL","XSUSHI"]
finalString = ""
for var in listOfVars:
    with open("template3.txt", "r") as template:
        templateText = template.read()
        templateTextNew = templateText.replace("WBTC", var)
        templateTextNew = templateTextNew.replace("aaa", str(random.randint(0, 254)))
        templateTextNew = templateTextNew.replace("bbb", str(random.randint(0, 254)))
        templateTextNew = templateTextNew.replace("ccc", str(random.randint(0, 254)))
        finalString += templateTextNew
print (finalString)

