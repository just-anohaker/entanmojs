# 模块lockvote

## getLockVote

**GET** - /api/lockvote/get

*说明*: 获取锁仓交易信息

**请求参数**

- `id`[**必填**] - `String`: 锁仓交易Id

**请求结果返回**

- `id` - `String` 交易Id
- `blockId` - `String` 打包区块Id
- `timestamp` - `Integer` 交易创建时间戳
- `senderId` - `String` 锁仓交易发送者地址
- `asset` - `json` 锁仓详情
  - `state` - `Integer` 锁仓状态
  - `lockAmount` - `BigNumber` 锁仓金额
  - `originHeight` - `Integer` 锁仓原始高度
  - `currentHeight` - `Integer` 锁仓当前动态高度
  - `address` - `String` 锁仓账号地址
  - `factor` - `Number` 锁仓时间增益系数
  - `numOfVotes` - `Integer` 锁仓对应票数

## getAllLockVotes

**GET** - /api/lockvote/all

*说明*: 获取满足条件的锁仓交易列表

**请求参数**

- `address`[*可选*] - `String`:  锁仓账号地址
- `state`[*可选*] - `Integer`:  锁仓状态，1:锁仓中; 0:已解锁仓
- `offset`[*可选*] - `Integer`:  偏移量
- `limit`[*可选*] - `Integer`: 最大数量，上限值100
- `orderByHeight`[*可选*] - `Integer`: 按高度排序，-1: 降序; 1: 升序
- `orderByAmount`[*可选*] - `Integer`: 按金额排序，-1: 降序; 1: 升序

**请求结果返回**

- `trs` - `Array<json>`
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
- `count` - `Integer` 满足条件的总数量

## getLockVote — id

**GET** - /api/lockvote/:id

*说明*: 获取锁仓交易信息

**请求参数** - *无*

**请求结果返回**

- `id` - `String` 交易Id
- `blockId` - `String` 打包区块Id
- `timestamp` - `Integer` 交易创建时间戳
- `senderId` - `String` 锁仓交易发送者地址
- `asset` - `json` 锁仓详情
  - `state` - `Integer` 锁仓状态
  - `lockAmount` - `BigNumber` 锁仓金额
  - `originHeight` - `Integer` 锁仓原始高度
  - `currentHeight` - `Integer` 锁仓当前动态高度
  - `address` - `String` 锁仓账号地址
  - `factor` - `Number` 锁仓时间增益系数
  - `numOfVotes` - `Integer` 锁仓对应票数

## putLockVote

**PUT** - /api/lockvote/

*说明*: 添加锁仓

**请求参数**

- `secret`[**必填**] - `String`: 账号密码

- `args`[**必填**] - `Array<String>`: 锁仓金额

  ​	eg. 锁仓1ETM -> ["100000000"]

- `publicKey`[*可选*] - `String`: 账号公钥

- `secondSecret`[**设置必填**] - `String`: 账号二级密码

**请求结果返回**

- `transactionId` - `String` 交易Id

## removeLockVote

**PUT** - /api/lockvote/remove

*说明*: 解除锁仓

**请求参数**

- `secret`[**必填**] - `String`: 账号密码

- `args`[**必填**] - `Array<String>`: 锁仓交易Id列表

  ​	eg. 解锁一个锁仓 lockvoteTrId -> [lockvoteTrId]

  ​	      解锁多个锁仓 lockvoteTrId1, lockvoteTrId2 -> [lockvoteTrId1, lockvoteTrId2]

- `publicKey`[*可选*] - `String`: 账号公钥

- `secondSecret`[**设置必填**] - `String`: 账号二级密码

**请求结果返回**

- `transactionId` - `String` 交易Id