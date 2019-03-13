# 模块delegates

## count

**GET** - /api/delegates/count

*说明*: 获取当前代理人总数量

**请求参数** - *无*

**请求结果返回**

- `count` - `Integer` 代理人总数量

## getVoters

**GET** - /api/delegates/voters

*说明*: 获取指定代理人的投票人列表

**请求参数**

- `publicKey`[**必填**] - `String`: 代理人公钥

**请求结果返回**

- `accounts` - `Array<json>`
  - `address` - `String` 投票人地址
  - `publicKey` - `String` 投票人公钥
  - `balance` - `BigNumber` 投票人当前余额
  - `username` - `String` 投票人昵称
  - `weight` - `Number` 投票人票数占代理人总票数权重

## getDelegate

**GET** - /api/delegates/get

*说明*: 获取满足条件的代理人详细信息

**请求参数**

- `publicKey`[**2选1**] - `String`: 代理人公钥
- `username`[**2选1**] - `String`: 代理人昵称

**请求结果返回**

- `delegate` - `json`
  - `username` - `String` 昵称
  - `address` - `String` 账号地址
  - `publicKey` - `String` 账号公钥
  - `balance` - `BigNumber` 账号余额
  - `vote` - `Integer` 获得票数
  - `rewards` - `BigNumber` 获得总奖励
  - `fees` - `BigNumber` 获得总交易费
  - `producedblocks` - `Integer` 生产区块数量
  - `missedblocks` - `Integer` 未成功生产区块数量
  - `isDelegate` - `Integer` 代理人状态
  - `rate` - `Integer` 名次
  - `approval` - `Number` 得票率
  - `productivity` - `Number` 生产率
  - `forged` - `String` 总收益

## getDelegates

**GET** - /api/delegates/

*说明*: 获取满足条件的代理人集

**请求参数**

- `address`[*可选*] - `String`: 投票人地址

- `offset`[*可选*] - `Integer`: 偏移值

- `limit`[*可选*] - `Integer`: 最大数量，限制最大值100

- `orderBy`[*可选*] - `String`:  排序规则

  ​	格式: "排序字段:排序方式"

  ​	排序方式

  ​		"desc": 降序

  ​		"asc": 升序

  ​	排序字段

  ​		[

  ​			"username", "address", "publicKey", "balance", "vote", "rewards",

  ​			"fees", "producedblocks", "missedblocks", "rate", "approval", "productivity",

  ​			"forged"

  ​		]

**请求结果返回**

- `delegates` - `Array<json>`
  - `username` - `String` 昵称
  - `address` - `String` 账号地址
  - `publicKey` - `String` 账号公钥
  - `balance` - `BigNumber` 账号余额
  - `vote` - `Integer` 获得票数
  - `rewards` - `BigNumber` 获得总奖励
  - `fees` - `BigNumber` 获得总交易费
  - `producedblocks` - `Integer` 生产区块数量
  - `missedblocks` - `Integer` 未成功生产区块数量
  - `isDelegate` - `Integer` 代理人状态
  - `rate` - `Integer` 名次
  - `approval` - `Number` 得票率
  - `productivity` - `Number` 生产率
  - `forged` - `String` 总收益
  - `voted` - `Boolean` 是否被address投票
- `totalCount` - `Integer` 满足条件的代理人总数量

## getFee

**GET** - /api/delegate/fee

*说明*: 获取代理人相关操作交易费

**请求参数** - *无*

**请求结果返回**

- `fee` - `BigNumber` 交易费

## getForgedByAccount

**GET** - /api/delegates/forging/getForgedByAccount

*说明*: 获取指定代理人出块收益信息

**请求参数**

- `generatorPublicKey`[**必填**] - `String`: 代理人公钥

**请求结果返回**

- `fees` - `BigNumber` 获得总交易费奖励
- `rewards` - `BigNumber` 获得总区块奖励
- `forged` - `BigNumber` 所有奖励总数

## addDelegate

**PUT** - /api/delegates/

*说明*: 注册代理人

**请求参数**

- `secret`[**必填**] - `String`: 账号密码
- `username`[**必填**] - `String`: 注册代理人昵称
- `publicKey`[*可选*] - `String`: 账号公钥
- `secondSecret`[**设置必填**] - `String`: 账号二级密码

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

## delDelegate

**PUT** - /api/delegates/undelegate

*说明*: 注销代理人

**请求参数**

- `secret`[**必填**] - `String`: 账号密码
- `publicKey`[*可选*] - `String`: 账号公钥
- `secondSecret`[**设置必填**] - `String`: 账号二级密码

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

