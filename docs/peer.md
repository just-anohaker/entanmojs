# 模块peer

## getPeers

**GET** - /api/peers/

*说明*: 获取当前节点存储的其它节点信息

**请求参数** - *无*

**请求结果返回**

- `peers` - `Array<json>`
  - `host` - `String` 节点地址
  - `port` - `Integer` 节点端口
- `count` - `Integer` 节点数量

## version

**GET** - /api/peers/version

*说明*: 获取当前节点版本信息

**请求参数** - *无*

**请求结果返回**

- `version` - `String` 节点系统版本
- `build` - `String` 节点系统构建库版本
- `net` - `String` 节点当前所有区块链网络标识

## getPeer

**GET** - /api/peers/get

*说明*: 获取指定的节点信息

**功能未实现**

