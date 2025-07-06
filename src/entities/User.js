const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    email: {
      type: 'varchar',
      length: 255,
      unique: true,
      nullable: false,
    },
    password: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    role: {
      type: 'varchar',
      length: 50,
      default: 'vendor',
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
  indices: [
    {
      name: 'IDX_USER_EMAIL',
      columns: ['email'],
      unique: true,
    },
  ],
  relations: {
    markets: {
      type: 'many-to-many',
      target: 'Market',
      joinTable: {
        name: 'market_users',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'market_id', referencedColumnName: 'id' }
      }
    }
  }
});