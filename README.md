# Exchange Rates API

This API provides exchange rates for specified currency pairs based on city. It accepts two parameters: the city code and the currency pair.

## Base URL

```bash
https://rates-api.vercel.app/api/rate
```

## Method: GET

### Parameters

| Parameter | Type   | Required | Description                                      |
|-----------|--------|----------|--------------------------------------------------|
| `city`    | string | Yes      | City code for which you want the exchange rate   |
| `pair`    | string | Yes      | Currency pair in the format `FROM/TO` (e.g. `BTC/USD`) |

### Example Request

```bash
GET https://rates-api.vercel.app/api/rate?city=MSK&pair=BTC/CASHUSD
```

### Example Success Response

```json
{
  "city": "MSK",
  "from": "BTC",
  "to": "CASHUSD",
  "in": "50000",
  "out": "51000"
}
```
### Example Error Response

```json
{
  "error": "Курс не найден."
}
```
## City Codes

Below is a list of city codes that can be used in the `city` parameter.

| City               | Code  |
|--------------------|-------|
| Moscow             | MSK   |
| Saint Petersburg   | SPB   |
| Tyumen             | TYUM  |
| Ufa                | UFA   |
| Vladivostok        | VVO   |
| Kaliningrad        | KLNG  |
| Nizhny Novgorod    | NNOV  |
| Novosibirsk        | NSK   |
| Barnaul            | BRNL  |
| Mariupol           | MRPL  |

## Supported Currencies

Below is a list of supported currency pairs that can be used in the `pair` parameter.

| From Currency   | To Currencies                                                                                                                       |
|:----------------|:------------------------------------------------------------------------------------------------------------------------------------|
| BTC             | USDTTRC20, CASHRUB, CASHUSD                                                                                                         |
| CASHAED         | USDTTRC20                                                                                                                           |
| CASHEUR         | USDTTRC20, ETH, BTC, USDTERC20, USDTBEP20                                                                                           |
| CASHRUB         | USDTPOLYGON, USDCERC20, USDTERC20, USDTSOL, DAI, XRP, ETC, TON, CEM, ZEC, BUSD, USDTTRC20, USDCTRC20, BTC, ETH, USDTBEP20, XMR, LTC |
| CASHTRY         | USDTTRC20                                                                                                                           |
| CASHUSD         | BTC, USDTTRC20, ETH                                                                                                                 |
| DAI             | CASHRUB                                                                                                                             |
| ETC             | CASHRUB                                                                                                                             |
| ETH             | CASHEUR, CASHRUB, CASHUSD                                                                                                           |
| LTC             | CASHRUB                                                                                                                             |
| SBERRUB         | ATMQRTHB                                                                                                                            |
| USDCERC20       | CASHUSD, CASHRUB                                                                                                                    |
| USDTBEP20       | CASHAED, CASHTHB, ATMQRTHB, BTC, CASHEUR, CASHUSD, CASHRUB                                                                          |
| USDTERC20       | CASHTHB, CASHAED, ATMQRTHB, BTC, CASHEUR, CASHUSD, CASHRUB                                                                          |
| USDTTRC20       | CASHTRY, CASHTHB, CASHAED, CEM, ATMQRTHB, WIRETHB, BTC, CASHUSD, CASHEUR, CASHRUB                                                   |
| XRP             | CASHRUB                                                                                                                             |


### Example Request for Moscow and BTC/USD

```bash
GET https://rates-api.vercel.app/api/rate?city=MSK&pair=BTC/CASHUSD
```

### Error handling
The API returns an error if required parameters are missing or invalid.

### Example Error for Missing Parameters
``` json
{
  "error": "Параметры city и pair обязательны."
}
```


