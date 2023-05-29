import sys
import json
import spacy

# Load the spaCy English model
nlp = spacy.load('en_core_web_sm')

def extract_tags(text):
    doc = nlp(text)
    tags = [token.text for token in doc if not token.is_stop and token.pos_ in ['NOUN', 'ADJ']]
    return tags

def calculate_similarity(set1, set2):
    intersection = len(set1 & set2)
    union = len(set1 | set2)
    similarity = intersection / union if union > 0 else 0
    return similarity

def find_similar_products(single_product, products, category, num_recommendations):
    single_product_tags = set(extract_tags(single_product.get('description', '')))
    single_product_categories = set(single_product.get('categories', '').split())

    # Filter products based on category
    filtered_products = [product for product in products if category in product.get('categories', '')]

    # Calculate the similarity score for each product
    similarity_scores = []
    for product in filtered_products:
        product_tags = set(extract_tags(product.get('description', '')))
        product_categories = set(product.get('categories', '').split())

        # Calculate the Jaccard similarity coefficient for tags
        tag_similarity = calculate_similarity(single_product_tags, product_tags)

        # Calculate the Jaccard similarity coefficient for categories
        category_similarity = calculate_similarity(single_product_categories, product_categories)

        # Calculate the weighted similarity score
        similarity_score = 0.3 * tag_similarity + 0.7 * category_similarity

        similarity_scores.append((product, similarity_score))

    # Sort products based on similarity score
    sorted_products = sorted(similarity_scores, key=lambda x: x[1], reverse=True)

    # Return top N similar products
    top_products = [product for product, _ in sorted_products[:num_recommendations]]
    return top_products


# Read the JSON input data from stdin
input_data = sys.stdin.read()
input_data = json.loads(input_data)

single_product = input_data.get('singleProduct', {})
products = input_data.get('products', [])
category = input_data.get('category', '')
num_recommendations = input_data.get('numRecommendations', 10)

similar_products = find_similar_products(single_product, products, category, num_recommendations)

result = {
    'similarProducts': similar_products
}

# Output the result as JSON to stdout
print(json.dumps(result))
