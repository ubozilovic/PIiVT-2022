import IngredientModel from "./IngredientModel.model";
import * as myslq2 from 'mysql2/promise';

class IngredientService {
    private db: myslq2.Connection;

    constructor(databaseConnection: myslq2.Connection){
        this.db = databaseConnection;
    }

    private async adaptToModel(data: any): Promise<IngredientModel> {
        const ingredient: IngredientModel = new IngredientModel();

        ingredient.ingredientId = +data?.ingredient_id;
        ingredient.name = data?.name;
        ingredient.ingredient_type = data?.ingredient_type;
        ingredient.categoryId = data?.category_id;


        return ingredient;
    }

    public async getAll(): Promise<IngredientModel[]> {
        return new Promise<IngredientModel[]>((resolve, reject) => {
            const sql: string = "SELECT * FROM `ingredient` ORDER BY `name`;";
       this.db.execute(sql)
            .then(async ([rows]) => {
                if (rows === undefined) {
                    return resolve([]);
                }
                const categories: IngredientModel[] = [];

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

    public async getById(ingredientId: number): Promise<IngredientModel|null> {
        return new Promise<IngredientModel|null>(
            (resolve, reject) => {
                const sql: string = "SELECT * FROM `ingredient` WHERE ingredient_id = ?;";
                this.db.execute(sql,[ingredientId])
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
    public async getByCategoryId(categoryId: number): Promise<IngredientModel[]> {
        return new Promise<IngredientModel[]>(
            (resolve, reject) => {
                const sql: string = "SELECT * FROM `ingredient` WHERE category_id = ? ORDER BY `name`;";
                this.db.execute(sql,[categoryId])
                .then(async ([rows]) => {
                    if (rows === undefined) {
                        return resolve([]);
                    }
                    const categories: IngredientModel[] = [];
    
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
}

export default IngredientService;