import React from 'react';

import Card from '../UI/Card/Card'
import Classes from './Recipes.css'


const recipes = (props) => {
    const all_recipes = props.recipes.map(recipe => (
        <Card img={recipe.image}
              title={recipe.title}
              key={recipe.id}
              id={recipe.id}
              author={recipe.author}
              click={() => props.recipeClick(recipe.id)}
              editClick={(ev) => props.editClick(ev, recipe.id)}
              editAble={props.email === recipe.author.email}
              profileImage={props.profileImage}
              ImageStyle={{maxHeight: "240px"}}>
            {recipe.description}
        </Card>
    ));

    return (
        <div className={Classes.Recipes}>
            {all_recipes}
        </div>
    )
};

export default recipes;