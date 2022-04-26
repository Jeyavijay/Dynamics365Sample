/*--------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * See License.txt in the project root for license information.
 *--------------------------------------------------------------*/

import { INodeProps, Module, Node } from '@msdyn365-commerce-modules/utilities';
import * as React from 'react';

import {
    ISearchFormViewProps,
    // ISearchKeywordViewProps,
    // ISearchCategoryViewProps,
    ISearchProductViewProps
} from '@msdyn365-commerce-modules/search/src/modules/search/./components';
import { ISearchViewProps } from '@msdyn365-commerce-modules/search/src/modules/search/./search';

const SearchView: React.FC<ISearchViewProps> = props => {
    const {
        Search,
        AutoSuggestAriaLabel,
        AutoSuggestAriaLabelText,
        searchText,
        AutoSuggest,
        ProductSuggest,
        UlProduct,
        form,
        // UlCategory,
        // autosuggestCategory,
        // autosuggestKeyword,
        // KeywordSuggest,
        // CategorySuggest,
        // UlKeyword,
        autosuggestProduct,
        SearchForm,
        FormWrapper,
        label,
        isLoadingAutoSuggest,
        isLoadingNode
    } = props;

    return (
        <Module {...Search}>
            {label}
            {_renderForm(form as ISearchFormViewProps, SearchForm, FormWrapper)}
            <Node {...AutoSuggest}>
                {searchText && searchText.length > 0 ? <Node {...AutoSuggestAriaLabel}>{AutoSuggestAriaLabelText}</Node> : ''}
                {/* {_renderKeywordSuggestions(KeywordSuggest, UlKeyword, autosuggestKeyword, isLoadingAutoSuggest, isLoadingNode)} */}
                {_renderProductSuggestions(ProductSuggest, UlProduct, autosuggestProduct, isLoadingAutoSuggest, isLoadingNode)}
                {/* {_renderCategorySuggestions(CategorySuggest, UlCategory, autosuggestCategory, isLoadingAutoSuggest, isLoadingNode)} */}
            </Node>
        </Module>
    );
};

const _renderForm = (form: ISearchFormViewProps, SearchForm: INodeProps, FormWrapper: INodeProps) => {
    return (
        <Node {...SearchForm}>
            <Node {...FormWrapper}>
                {form.input}
                {form.cancelBtn}
                {form.submitBtn}
            </Node>
        </Node>
    );
};

// const _renderKeywordSuggestions = (
//     KeywordSuggest: INodeProps,
//     UlKeyword: INodeProps,
//     keywordSuggestions?: ISearchKeywordViewProps,
//     isLoadingAutoSuggest?: boolean,
//     isLoadingNode?: React.ReactNode
// ) => {
//     return (
//         keywordSuggestions && (
//             <Node {...KeywordSuggest}>
//                 <Node {...UlKeyword}>
//                     {isLoadingAutoSuggest && isLoadingNode}
//                     {!isLoadingAutoSuggest &&
//                         keywordSuggestions.text.map(text => {
//                             return text;
//                         })}
//                 </Node>
//             </Node>
//         )
//     );
// };

const _renderProductSuggestions = (
    ProductSuggest: INodeProps,
    UlProduct: INodeProps,
    productSuggestions?: ISearchProductViewProps,
    isLoadingAutoSuggest?: boolean,
    isLoadingNode?: React.ReactNode
) => {
    return (
        productSuggestions && (
            <Node {...ProductSuggest}>
                <Node {...UlProduct}>
                    {productSuggestions.title}
                    {isLoadingAutoSuggest && isLoadingNode}
                    {!isLoadingAutoSuggest &&
                        productSuggestions.items.map((item, index) => {
                            return (
                                <Node {...item.LiProduct} key={item.id || index}>
                                    <Node {...item.AProduct}>
                                        {item.thumbnail}
                                        {item.text}
                                        {item.price}
                                    </Node>
                                </Node>
                            );
                        })}
                </Node>
            </Node>
        )
    );
};

// const _renderCategorySuggestions = (
//     CategorySuggest: INodeProps,
//     UlCategory: INodeProps,
//     categorySuggestions?: ISearchCategoryViewProps,
//     isLoadingAutoSuggest?: boolean,
//     isLoadingNode?: React.ReactNode
// ) => {
//     return (
//         categorySuggestions && (
//             <Node {...CategorySuggest}>
//                 <Node {...UlCategory}>
//                     {categorySuggestions.title}
//                     {isLoadingAutoSuggest && isLoadingNode}
//                     {!isLoadingAutoSuggest &&
//                         categorySuggestions.text.map(text => {
//                             return text;
//                         })}
//                 </Node>
//             </Node>
//         )
//     );
// };

export default SearchView;
