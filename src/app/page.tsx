import RecipeCard from "@/components/RecipeCard";
import style from "../styles/page-styles/index.module.css";

export interface IRecipe {
  id: number;
  recipeName: string;
  description: string;
  creator: {
    id: number;
    username: string;
  };
}

async function getRecentRecipes() {
  let res = await fetch(`${process.env.DEV_SERVER}/api/recipes/recent`);
  let recent = await res.json();
  return recent;
}

async function getBestRecipes() {
  let res = await fetch(`${process.env.DEV_SERVER}/api/recipes/best`);
  let best = await res.json();
  return best;
}

export default async function Home() {
  const recent = await getRecentRecipes();
  const best = await getBestRecipes();

  return (
    <main className={style.index}>
      <div className={style.heroSection}>
        <h1 className={style.heroHeader}>
          Welcome to <span className={style.title}>Recipe-App</span>
        </h1>
        <p className={style.heroParagraph}>
          Find something delicious for yourself!
        </p>
      </div>
      <div className={style.recent}>
        <h1 className={style.recentHeader}>Recent Recipes</h1>
        <div className={style.recentRecipes}>
          {recent.map((recipe: IRecipe) => (
            <RecipeCard
              id={recipe.id}
              recipeName={recipe.recipeName}
              description={recipe.description}
              creator={recipe.creator}
            />
          ))}
        </div>
      </div>
      <div className={style.ad}>
        <h1 className={style.adHeader}>Also Check out our shope here</h1>
        <button className={style.adButton}>Click</button>
      </div>
      <div className={style.recent}>
        <h1 className={style.recentHeader}>Best Recipes</h1>
        <div className={style.recentRecipes}>
          {best.map((recipe: IRecipe) => (
            <RecipeCard
              id={recipe.id}
              recipeName={recipe.recipeName}
              description={recipe.description}
              creator={recipe.creator}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
