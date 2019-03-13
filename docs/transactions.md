# 模块transactions


## getTransaction

**GET** - /api/transactions/get

*说明*: 获取满足条件的交易

**请求参数**

- `id`[**必填**] - `String`: 交易Id

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

## getTransactions

**GET** - /api/transactions/

*说明*: 获取满足条件的交易集

**请求参数**

- `offset`[*可选*] - `Integer`: 偏移
- `limit`[*可选*] - `Integer`: 最大数量，限制为100
- `orderBy`[*可选*] - `String`: 排序规则
- `type`[*可选*]  - `Integer`: 交易类型
- `senderId`[*可选*] - `String`: 交易发送者地址
- `senderPublicKey`[*可选*] - `String`: 交易发送者公钥
- `recipientId`[*可选*] - `String`: 交易接收者地址
- `ownerPublicKey`[*可选*] - `String`: 发送者公钥
- `ownerAddress`[*可选*] - `String`: 发送者或接收者地址
- `amount`[*可选*] - `Integer`: 金额
- `fee`[*可选*] - `Integer`: 交易费
- `currency`[*可选*] - `String`: 资产符号
- `and`[*可选*] - `Integer`: 条件连接方式

**请求结果返回**

- `transactions` - `Array<json>`
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

## getUnconfirmedTransaction

**GET** - /api/transactions/unconfirmed/get

*说明*: 获取满足条件的未确认交易

**请求参数**

- `id`[**必填**] - `String`: 交易Id

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

## getUnconfirmedTransactions

**GET** - /api/transactions/unconfirmed/

*说明*: 获取满足条件的未确认交易集

**请求参数**

- `senderPublicKey`[*可选*] - `String`: 发送者公钥
- `address`[*可选*] - `String`: 接收者地址

**请求结果返回**

- `transactions` - `Array<json>`
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

## addTransactions

**PUT** - /api/transactions/

*说明*: 转账

**请求参数**

- `secret`[**必填**] - `String`: 账号密码
- `recipientId`[**必填**] - `String`: 接收者地址
- `amount`[**必填**] - `Integer`: 转账金额
- `publicKey`[*可选*] - `String`: 账号公钥
- `secondSecret`[**设置必填**] - `String`: 账号二级密码
- `message`[*可选*] - `String`: 附加消息
- `multisigAccountPublicKey`[*可选*] - `String`: 多重签名账号公钥

**请求结果返回**

- `transactionId` - `String` 交易Id

## addDelayTransactions

**PUT** - /api/transactions/delay 

*说明*: 延时转账

**请求参数**

- `secret`[**必填**] - `String`: 账号密码
- `recipientId`[**必填**] - `String`: 接收者地址
- `amount`[**必填**] - `Integer`: 转账金额
- `args` - `Array<String>`: 延时到账时间，eg.["1938485755"]单位second
- `publicKey`[*可选*] - `String`: 账号公钥
- `secondSecret`[**设置必填**] - `String`: 账号二级密码
- `message`[*可选*] - `String`: 附加消息
- `multisigAccountPublicKey`[*可选*] - `String`: 多重签名账号公钥

**请求结果返回**

- `transactionId` - `String` 交易Id

