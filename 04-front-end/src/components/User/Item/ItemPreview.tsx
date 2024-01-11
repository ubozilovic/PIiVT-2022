import IItem from "../../../models/IItem.model";
import * as path from "path-browserify";
import './ItemPreview.sass';
import ISize from "../../../models/ISize.model";
import { useState } from "react";
import { motion } from "framer-motion";
import { Config } from "../../../Config";

export interface IItemPreviewProperties {
    item: IItem;
}

export default function ItemPreview(props: IItemPreviewProperties) {
    function getItemPhotoUrl() {
        if (props.item.photos.length === 0) {
            return "PLACEHOLDER";
        }

        const fullFilePath = props.item.photos[0].filePath;

        const directory = path.dirname(fullFilePath);
        const filename  = path.basename(fullFilePath);
        const prefix    = 'small-';

        return Config.API_PATH + "/assets/" + directory + '/' + prefix + filename;
    }

    interface ISizeCartAdderProperties {
        itemId: number;
        size: ISize;
    };

    function SizeCartAdder(props: ISizeCartAdderProperties) {
        
        const [ error, setError ] = useState<string>("");
        const [ message, setMessage ] = useState<string>("");

        

        return (
            <motion.div className="form-group"
                initial={{
                    position: "relative",
                    top: 20,
                    scale: 0.75,
                    opacity: 0,
                }}
                animate={{
                    top: 0,
                    scale: 1,
                    opacity: 1,
                }}
                transition={{
                    delay: 0.125,
                }}>
                <div className="input-group input-group-sm">
                    <span className="input-group-text w-50" title={ "Energy: " + props.size.kcal + " kcal" }>
                        { props.size.size.name } ({ Number(props.size.price).toFixed(2) + " RSD" })
                    </span>
                    
                    
                </div>
                { error   && <p className="alert alert-danger mt-3">{ error }</p> }
                { message && <p className="alert alert-success mt-3">{ message }</p> }
            </motion.div>
        );
    }

    return (
        
        <div className="col col-12 col-md-6 col-lg-4 item">
            <div className="card">
                <img className="card-img-top item-image"
                    src={ getItemPhotoUrl() }
                    alt={ props.item.name }
                    onError={ e => (e.target as HTMLImageElement).src = Config.API_PATH + '/assets/placeholder.png' } />
                <div className="card-body">
                    <div className="card-title">
                        <h3 className="h6">{ props.item.name }</h3>
                    </div>
                    <div className="card-text">
                        <p className="item-description">{ props.item.description }</p>
                        <p>
                            { props.item.ingredients.map(ingredient => <span className="ingredient" key={ "ingredient-" + props.item.itemId + "-" + ingredient.ingredientId }>{ ingredient.name }</span>) }
                        </p>
                        <div className="d-grid gap-3">
                            { props.item.sizes.map( size =>
                                <SizeCartAdder key={ "size-" + props.item.itemId + "-" + size.size.sizeId }
                                    size={ size } itemId={ props.item.itemId } />
                            ) }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}