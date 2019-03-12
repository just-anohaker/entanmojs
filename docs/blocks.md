# 模块blocks

## getBlock

**GET** - /api/blocks/get

*说明*: 获取指定区块信息

**请求参数**

- `id`[**2选1**] - `String`: 区块Id
- `height`[**2选1**] - `Integer`: 区块高度

**请求返回结果**

- `block` - `json`
  - `id` - `String` 区块Id
  - `height` - `Intger` 区块高度
  - `previousBlock` - `String` 上一个区块Id
  - `generatorPublicKey` - `String` 区块生产者公钥
  - `address` - `String` 区块生产者地址
  - `timestamp` - `Integer` 区块生产时间戳
  - `numberOfTransactions` - `Intger` 区块包含的交易数量
  - `totalAmount` - `BigNumber` 区块包含的总转账金额
  - `totalFee` - `BigNumber` 区块包含的总交易费
  - `reward` - `BigNumber` 区块奖励
  - `confirmations` - `Integer` 区块被确认数
  - `blockSignature` - `String` 区块签名信息
  - `payloadHash` - `String` 区块打包内容Hash值
  - `payloadLength` - `Integer` 区块打包内容长度
  - `version` - `Integer` 区块版本

## getFullBlock

**GET** - /api/blocks/full

*说明*: 获取指定区块的详细信息(包含区块中打包的交易信息)

**请求参数**

- `id`[**2选1**] - `String`: 区块Id
- `height`[**2选1**] - `Integer`: 区块高度

**请求返回结果**

- `block` - `json`
  - `id` - `String` 区块Id
  - `height` - `Intger` 区块高度
  - `previousBlock` - `String` 上一个区块Id
  - `generatorPublicKey` - `String` 区块生产者公钥
  - `address` - `String` 区块生产者地址
  - `timestamp` - `Integer` 区块生产时间戳
  - `numberOfTransactions` - `Intger` 区块包含的交易数量
  - `totalAmount` - `BigNumber` 区块包含的总转账金额
  - `totalFee` - `BigNumber` 区块包含的总交易费
  - `reward` - `BigNumber` 区块奖励
  - `confirmations` - `Integer` 区块被确认数
  - `blockSignature` - `String` 区块签名信息
  - `payloadHash` - `String` 区块打包内容Hash值
  - `payloadLength` - `Integer` 区块打包内容长度
  - `version` - `Integer` 区块版本
  - transactions - `Array<json>`
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

## getBlocks

**GET** - /api/blocks/

*说明*: 获取满足查询条件的区块集

**请求参数**

- `offset`[*可选*] - `Integer`: 偏移值

- `limit`[*可选*] - `Integer`: 最大数量，上限100

- `orderBy`[*可选*] - `String`:  排序规则

  ​	格式: "排序字段:排序方式"

  ​	排序方式

  ​		"desc": 降序

  ​		"asc": 升序

  ​	排序字段

  ​		[

  ​			"id", "timestamp", "height", "previousBlock", "totalAmount", 

  ​			"totalFee", "reward", "numberOfTransactions", "generatorPublicKey"

  ​		]

- `height`[*可选*] - `Integer`: 高度

- `generatorPublicKey`[*可选*] - `String`: 生产者公钥

- `previousBlock`[*可选*] - `String`: 上一个区块Id

- `totalAmount`[*可选*] - `BigNumber`: 总转账金额

- `totalFee`[*可选*] - `BigNumber`: 总交易费

- `reward`[*可选*] - `BigNumber`: 区块奖励

**请求结果返回**

- `blocks` - `Array<json>`
  - `id` - `String` 区块Id
  - `height` - `Intger` 区块高度
  - `previousBlock` - `String` 上一个区块Id
  - `generatorPublicKey` - `String` 区块生产者公钥
  - `address` - `String` 区块生产者地址
  - `timestamp` - `Integer` 区块生产时间戳
  - `numberOfTransactions` - `Intger` 区块包含的交易数量
  - `totalAmount` - `BigNumber` 区块包含的总转账金额
  - `totalFee` - `BigNumber` 区块包含的总交易费
  - `reward` - `BigNumber` 区块奖励
  - `confirmations` - `Integer` 区块被确认数
  - `blockSignature` - `String` 区块签名信息
  - `payloadHash` - `String` 区块打包内容Hash值
  - `payloadLength` - `Integer` 区块打包内容长度
  - `version` - `Integer` 区块版本
- `count` - `Integer` 数组元素个数

## getHeight

**GET** - /api/blocks/getHeight

*说明*: 获取当前链高度

**请求参数** - *无*

**请求结果返回**

- `height` - `Integer` 节点当前最新区块高度

## getFee

**GET** - /api/blocks/getFee

*说明*: 获取链交易费

**请求参数** - *无*

**请求结果返回**

- `fee` - `BigNumber` 交易费

## getMilestone

**GET** - /api/blocks/getMilestone

*说明*: 获取链当前的里程碑阶段

**请求参数** - *无*

**请求结果返回**

- `milestone` - `Integer` 里程碑阶段

## getReward

**GET** - /api/blocks/getReward

*说明*: 获取链当前区块奖励

**请求参数** - 无

**请求结果返回** 

- `reward` - `BigNumber` 当前区块奖励

## getSupply

**GET** - /api/blocks/getSupply

*说明*: 获取链当前已发行的Token总量

**请求参数** - 无

**请求结果返回**

- `supply` - `BigNumber` 总发行量

## getStatus

**GET** - /api/blocks/getStatus

*说明*: 获取链当前状态(集合:高度、交易费、里程碑、奖励和发行量)

**请求参数** - *无*

**请求结果返回**

- `height` - `Integer` 节点当前最新区块高度
- `fee` - `BigNumber` 交易费
- `milestone` - `Integer` 里程碑阶段
- `reward` - `BigNumber` 当前区块奖励
- `supply` - `BigNumber` 总发行量
