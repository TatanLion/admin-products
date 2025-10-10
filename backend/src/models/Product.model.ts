import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';

@Table({ tableName: 'products' })

class Product extends Model {
    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    // @NOTE 'declare' se usa para indicar que la propiedad será inicializada por Sequelize
    declare name: string; 

    @Column({
        type: DataType.FLOAT(10, 2),
        allowNull: false
    })
    // @NOTE 'declare' se usa para indicar que la propiedad será inicializada por Sequelize
    declare price: number;

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    // @NOTE 'declare' se usa para indicar que la propiedad será inicializada por Sequelize
    declare availability: boolean;
}

export default Product;