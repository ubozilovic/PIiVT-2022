import CategoryModel from "./CategoryModel.model";
import * as myslq2 from 'mysql2/promise';

class CategoryService {
    private db: myslq2.Connection;

    constructor(databaseConnection: myslq2.Connection){
        this.db = databaseConnection;
    }

    private async adaptToModel(data: any): Promise<CategoryModel> {
        const category: CategoryModel = new CategoryModel();

        category.categoryId = +data?.category_id;
        category.name = data?.name;


        return category;
    }

    public async getAll(): Promise<CategoryModel[]> {
        return new Promise<CategoryModel[]>((resolve, reject) => {
            const sql: string = "SELECT * FROM `category` ORDER BY `name`;";
       this.db.execute(sql)
            .then(async ([rows]) => {
                if (rows === undefined) {
                    return resolve([]);
                }
                const categories: CategoryModel[] = [];

                for(const row of rows as myslq2.RowDataPacket[]) {
                    categories.push(await this.adaptToModel(row));
                }

                resolve(categories);
            })
            .catch(error => {
                reject(error);
            });
            }
        );
    }

    public async getById(categoryId: number): Promise<CategoryModel|null> {
        return new Promise<CategoryModel|null>(
            (resolve, reject) => {
                const sql: string = "SELECT * FROM `category` WHERE category_id = ?;";
                this.db.execute(sql,[categoryId])
                .then(async ([rows]) => {
                    if (rows === undefined ) {
                        return resolve(null);
                    }
                    if(Array.isArray(rows) && rows.length === 0) {
                        return resolve(null);
                    }
                    resolve(await this.adaptToModel(rows[0]));
                })
                .catch(error => {
                    reject(error);
                })
            }
            
        );
    }
}

export default CategoryService;