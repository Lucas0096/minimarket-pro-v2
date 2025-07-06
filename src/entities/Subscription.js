const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Subscription',
  tableName: 'subscriptions',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    startDate: {
      type: 'date',
      nullable: false,
    },
    endDate: {
      type: 'date',
      nullable: false,
    },
    status: {
      type: 'varchar',
      length: 50,
      default: 'active',
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
    market: {
      type: 'many-to-one',
      target: 'Market',
      joinColumn: { name: 'marketId', referencedColumnName: 'id' },
      nullable: false,
      onDelete: 'CASCADE',
    }
  }
});