# 模块signatures

## addSignature

**GET** - /api/signatures/

*说明*: 设置二级密码

**请求参数**

- `secret`[**必填**] - `String`: 账号密码 
- `secondSecret`[**必填**] - `String`: 二级密码
- `publicKey`[*可选*] - `String`: 账号公钥

**请求结果返回**

- `transaction` - `json`
  - `id` - `String` 交易Id
  - `type` - `Integer` 交易类型
  - `amount` - `BigNumber` 交易金额
  - `fee` - `BigNumber` 交易费
  - `senderId` - `String` 交易发送者地址
  - `senderPublicKey` - `String` 交易发送者公钥
  - `timestamp` - `Integer` 交易产生时间
  - `asset` - `json` 交易验证参数
  - `args` - `json` 交易附加参数
  - `message` - `String` 交易附加消息

## getFee

**GET** - /api/signatures/fee

*说明*: 获取设置二级密码所需交易费

**请求参数** - *无*

**请求结果返回**

- `fee` - `BigNumber` 交易费