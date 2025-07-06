const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Market',
  tableName: 'markets',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    name: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    status: {
      type: 'varchar',
      length: 50,
      default: 'active',
    },
    lastActivity: {
      type: 'timestamp',
      nullable: true,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
      default: () => 'CURRENT_TIMESTAMP',
    },
    updatedAt: {
      type: 'timestamp',
      updateDate: true,
      default: () => 'CURRENT_TIMESTAMP',
    },
  },
  relations: {
    users: {
      type: 'many-to-many',
      target: 'User',
      joinTable: {
        name: 'market_users',
        joinColumn: { name: 'market_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' }
      }
    },
    subscriptions: {
      type: 'one-to-many',
      target: 'Subscription',
      inverseSide: 'market'
    }
  }
});