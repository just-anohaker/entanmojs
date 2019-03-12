# 模块accounts

## open

**POST**  - /api/accounts/open

*说明*: 使用账号secret进行登陆并返回对应账号详细信息

**请求参数**

- `secret`[**必填**] - `String`: 账号secret

**请求结果返回**

- `account` - `json`
  - `address` - `String` 账号地址
  - `publicKey` - `String` 账号publicKey
  - `balance` - `BigNumber` 账号余额
  - `secondPublicKey` - `String` 二级密码publicKey
  - `secondSignature` - `Boolean` 是否设置二级密码
  - `multisignatures` - `String` 多重签名

## open2

**POST** - /api/accounts/open2

*说明*: 使用账号publicKey信息进行登陆并返回账号详细信息

**请求参数**

- `publicKey`[**必填**] - `String`: 账号公钥

**请求结果返回**

- `account` - `json`
  - `address` - `String` 账号地址
  - `publicKey` - `String` 账号publicKey
  - `balance` - `BigNumber` 账号余额
  - `secondPublicKey` - `String` 二级密码publicKey
  - `secondSignature` - `Boolean` 是否设置二级密码
  - `multisignatures` - `String` 多重签名
- `latestBlock` - `json`
  - `height` - `Integer` 当前区块高度
  - `timestamp` - `Integer` 当前高度区块对应的时间戳
- `version` - `json`
  - `version` - `String` 节点系统版本
  - `build` - `String` 节点系统构建库版本
  - `net` - `String` 节点当前所有区块链网络标识

## getBalance

**GET** - /api/accounts/getBalance

*说明*: 获取指定地址账号余额

**请求参数**

- `address`[**必填**] - `String`: 账号地址

**请求结果返回**

- `balance` - `BigNumber` 可用余额
- `delayAmount` - `BigNumber` 当前账号延时到账总金额

## getPublicKey

**GET** - /api/accounts/getPublicKey

*说明*: 获取指定账号地址对应的公钥

**请求参数**

- `address`[**必填**] - `String`: 账号地址

**请求结果返回**

- `publicKey` - `String` 公钥

## generatePublicKey

**POST** - /api/accounts/generatePublicKey

*说明*: 查询指定secret对应的公钥信息

**请求参数**

- `secret`[**必填**] - `String`: 账号密码

**请求结果返回**

- `publicKey` - `String` 公钥

## getDelegates

**GET** - /api/accounts/delegates

*说明*: 获取指定地址投票的代理人信息

**请求参数**

- `address`[**必填**] - `String`: 账号地址

**请求结果返回**

- `delegates` - `Array<json>`
  - `username` - `String` 代理人昵称
  - `address` - `String` 代理人地址
  - `publicKey` - `String` 代理人公钥
  - `vote` - `BigNumber` 代理人持有票数
  - `missedblocks` - `Integer` 代理人出块失败次数
  - `producedblocks` - `Integer` 代理人成功出块数量
  - `rate` - `Integer` 代理人按票数排名名次
  - `approval` - `Number` 代理人得票率
  - `productivity` - `Number` 代理人生产率

## getDelegateFee

**GET** - /api/accounts/delegates/fee

*说明*: 获取代理人投票所需交易费

**请求参数** - *无*

**请求结果返回**

- `fee` - `BigNumber` 投票交易费

## addDelegates

**PUT** - /api/accounts/delegates

*说明*: 对指定代理进行投票或取消投票

**请求参数**

- `secret`[**必填**] - `String`: 投票人账号密码

- `delegates`[**必填**] - `Array<String>`：投票或是取消投票代理人列表

  ​	增加投票时，使用"+delegatePublicKey"

  ​	取消投票时，使用"-delegatePublicKey"

  ​	例如：[

  ​		"+addDelegatePublicKey" // 待投票的代理人信息

  ​		"-removeDelegatePublickey" // 待取消的代理人信息

  ​	]

- `publicKey`[*可选*] - `String`: 投票人公钥

- `secondSeret`[**设置必填**] - `String`: 投票人二级密码

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

## getAccount

**GET** - /api/accounts/

*说明*: 获取指定账号详细信息

**请求参数**

- `address`[**必填**] - `String`

**请求结果返回**

- `account` - `json`
  - `address` - `String` 账号地址
  - `publicKey` - `String` 账号publicKey
  - `balance` - `BigNumber` 账号余额
  - `secondPublicKey` - `String` 二级密码publicKey
  - `secondSignature` - `Boolean` 是否设置二级密码
  - `multisignatures` - `String` 多重签名
- `latestBlock` - `json`
  - `height` - `Integer` 当前区块高度
  - `timestamp` - `Integer` 当前高度区块对应的时间戳
- `version` - `json`
  - `version` - `String` 节点系统版本
  - `build` - `String` 节点系统构建库版本
  - `net` - `String` 节点当前所有区块链网络标识

## newAccount

**GET** - /api/accounts/new

*说明*: 创建新账号(密码，公钥，私钥，地址)

**请求参数**

- `ent`[*可选*] - `Integer`: 密码长度，取值为[128, 256]之一

**请求结果返回**

- `secret` - `String` 账号密码
- `publicKey` - `String` 账号公钥
- `privateKey` - `String` 账号私钥
- `address` - `String` 账号地址

## accountOnBlockchain

**GET** - /api/accounts/effectivity

*说明*: 检测指定地址是否在链上

**请求参数**

- `address`[**必填**] - `String`: 账号地址

**请求结果返回**

- `effectivity` - `Boolean` true: 在链上; false: 不在链上

## listDelayTransfer

**GET** - /api/accounts/delayOrders

*说明*: 获取指定地址对应的延时转账交易信息

**请求参数**

- `address`[**必填**] - `String`: 账号地址
- `mode`[**必填**] - `Integer`: 延时到账交易状态,0 - 未到账; 1 - 已到账

**请求结果返回**

- `result` - `Array<json>`
  - `id` - `String` 交易Id
  - `senderId` - `String` 延时转账交易发送者地址
  - `recipientId` - `String` 延时转账交易接收者地址
  - `amount` - `BigNumber` 延时转账金额
  - `expired` - `Integer` 延时到账到期高度
- `latestHeight` - `Integer` 当前最新区块高度

## top

**GET**- /api/accounts/top

*说明*: 获取指定区间的账号信息(地址，公钥，余额)

**请求参数**

- `offset`[*可选*] - `Integer`: 偏移值
- `limit`[*可选*] - `Integer`: 最大获取数量，上限为100

**请求结果返回**

- `accounts` - `Array<json>`
  - `address` - `String` 账号地址
  - `publicKey` - `String` 账号公钥
  - `balance` - `BigNumber` 账号余额

## count

**GET** - /api/accounts/count

*说明*: 获取当前链上的有效账号总数

**请求参数** - *无*

**请求结果返回**

- `count` - `Integer` 账号总数

