import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import Classes from './RecipeForm.css'
import Input from '../../UI/Input/Input'
import {connect} from "react-redux";

import Spinner from '../../UI/Spinner/Spinner'
import {axiosRecipesInstance} from "../../../axios/axios";
import MultiSelector from "../../UI/MultiSelector/MultiSelector";
import * as actions from "../../../store/actions";


class RecipeForm extends Component {

    state = {
        recipeForm: {
            title: {
                inputType: "input",
                elementConfig: {
                    hintText: "הכנס כותרת למתכון",
                    floatingLabelText: "כותרת",
                },
                value: "",
            },
            image: {
                inputType: "file",
                elementConfig: {
                    hintText: "הכנס URL לתמונה",
                    floatingLabelText: "תמונה",

                },
                value: "",
                files: null
            },
            breaf: {
                inputType: "textarea",
                elementConfig: {
                    hintText: "הכנס תקציר קצר של המתכון - זה הדבר הראשון שאנשים יראו",
                    floatingLabelText: "תקציר",
                    rows: 3,
                    rowsMax: 3,
                },
                value: "",
            },
            content: {
                inputType: "textarea",
                elementConfig: {
                    hintText: "הכנס את המתכון עם כל הפרטים כדי שנוכל כולנו להכין (=",
                    floatingLabelText: "מתכון",
                    rows: 4,
                    rowsMax: 4,
                },
                value: "",
            },
        },
        submitted: false,
        selectedRecipeTags: [],
        editMode: false,
        recipeToEdit: null
    };

    componentDidMount() {
        if (this.props.editMode) {
            this.setState({editMode: this.props.editMode},
                () => this.SetRecipeToUpdate(this.setRecipeFormValues))
        }
    }



    inputChangedHandler = (event, inputId) => {
        const updatedRecipeForm = {...this.state.recipeForm};
        const updatedFormElement = {...updatedRecipeForm[inputId]};

        updatedFormElement.value = event.target.value;

        // Handle file type input
        if (updatedRecipeForm[inputId]["inputType"] === "file")
            updatedFormElement.files = event.target.files;

        updatedRecipeForm[inputId] = updatedFormElement;

        this.setState({
            recipeForm: updatedRecipeForm
        });
    };

    submitHandler = (event) => {
        event.preventDefault();

        let tags = this.state.selectedRecipeTags.map(tag => tag.value);
        this.setState((prevState) => ({
            ...prevState,
            submitted: true
        }));
        const rf = this.state.recipeForm;

        const fd = new FormData();
        fd.append("recipeImage", rf.image.files ? rf.image.files[0] : rf.image.value);
        fd.append("title", rf.title.value);
        fd.append("description", rf.breaf.value);
        fd.append("body", rf.content.value);
        fd.append("tags", JSON.stringify(tags));

        this.sendRequestToServer(fd);
    };

    sendRequestToServer = (fd) => {
        if (this.state.editMode) {
            this.props.updateRecipe(this.props.match.params.id, fd)
                .then((response) => this.props.history.replace("/recipe/" + response.data.recipe.id))
        }
        else {
            this.props.addRecipe(fd)
                .then((response) => {
                    // Remove scroller position
                    localStorage.removeItem("homeScroller");
                    this.props.history.replace("/recipe/" + response.data.recipe.id)

                })
        }
    };

    handleTagSelectionChange = (value) => {
        this.setState({selectedRecipeTags: value})
    };

    SetRecipeToUpdate = (action) => {
        axiosRecipesInstance.get("/", {
            headers: {
                Authorization: "Bearer " + this.props.token
            },
            params: {
                limit: 1,
                id: this.props.match.params.id
            }
        }).then((res) => {
            this.setState({
                recipeToEdit: res.data.recipes[0]
            }, action)
        });
    };

    setRecipeFormValues = () => {
        const rf = {...this.state.recipeForm};
        const title = {...rf.title};
        const image = {...rf.image};
        const breaf = {...rf.breaf};
        const content = {...rf.content};


        const recipe = this.state.recipeToEdit;

        title.value = recipe.title;
        image.value = recipe.image;
        breaf.value = recipe.description;
        content.value = recipe.body;

        const tags = recipe.tags.map(tag => ({
            value: tag,
            label: tag
        }));

        rf.title = title;
        rf.image = image;
        rf.breaf = breaf;
        rf.content = content;

        this.setState({recipeForm: rf, selectedRecipeTags: tags})

    };

    render() {
        let content = <Spinner/>;
        if (!this.state.submitted) {
            const formElements = [];
            for (let key in this.state.recipeForm) {
                formElements.push({
                    id: key,
                    config: this.state.recipeForm[key],
                })
            }

            content = (
                <form onSubmit={this.submitHandler}>
                    <div className={Classes.Selector}>
                        <MultiSelector placeholder="בחר תג/תגיות למתכון זה"
                                       handleChange={this.handleTagSelectionChange}
                                       createable
                                       value={this.state.selectedRecipeTags}>
                            {this.props.allTags.map((tag) => ({value: tag, label: tag}))}
                        </MultiSelector>
                    </div>

                    {formElements.map(formElement => (
                            <Input elementType={formElement.config.inputType}
                                   elementConfig={formElement.config.elementConfig}
                                   value={formElement.config.value}
                                   key={formElement.id}
                                   changed={(ev) => this.inputChangedHandler(ev, formElement.id)}/>
                        )
                    )}
                    <RaisedButton type="submit"
                                  label="שלח"
                                  primary={true}/>
                </form>
            )
        }


        return (
            <div className={Classes.Containers} dir="rtl">
                <div className={Classes.RecipeDetails}>
                    {content}
                </div>
            </div>
        );
    }

};

const mapStateToProps = state => (
    {
        token: state.auth.token,
        allTags: state.tags.tags_list,
        allRecipes: state.recipes.recipes
    }
);

const mapDisptchTopProps = dispatch => (
    {
        updateRecipe: (id, newData) => dispatch(actions.updateRecipe(id, newData)),
        addRecipe: (data) => dispatch(actions.addRecipe(data)),
    }
);

export default connect(mapStateToProps, mapDisptchTopProps)(RecipeForm);
