# 模块system

## getSystemInfo

**GET** - /api/system/

*说明*: 获取系统信息

**请求参数** - *无*

**请求结果返回**

- `os` - `String` 操作系统信息
- `version` - `String` 节点当前使用版本信息
- `timestamp` - `Integer` 节点当前时间
- `lastBlock` - `json` 
  - `height` - `Integer` 当前区块高度
  - `timestamp` - `Integer` 节点最新区块生产时间
  - `behind` - `Integer` 下一个slot与最新区块slot之间的差值
- `systemLoad` - `json`
  - `cores` - `Integer` CPU内核数量
  - `loadAvergae` - `Integer` 内存使用量
  - `freeMem` - `Integer` 内存未使用量
  - `totalMem` - `Integer` 内存总量