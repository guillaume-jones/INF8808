/**
 * Load the CSVs and filters unecessary IDs and empty counters
 * 
 * Inputs : All the data CSVs
 * 
 * Process :
 *  - Filters unecessaty IDs
 *  - Removes empty or incomplete counters
 *  - Combines the CSVs in one Dataset
 * 
 * Outputs : The filtered and combined Dataset
 */

/**
 * Determines the Neighborhood of a specific counter based on its coordinates
 * 
 * Inputs : x and y coordinates
 *          montreal.json
 * 
 * Process :
 *  - Je sais pas comment on va faire ca lol
 *  - Transforms the coordinates in pixels
 * 
 * Output : The Neighborhood in which the counter is located (string)
 *          The transformed coordinates
 */


/**
 * Transforms the coordinates 
 */

/**
 * Generates the data for the map
 * 
 * Inputs : Dataset
 * 
 * Process :
 *  - Filters data for the selected year
 *  - Computes the sum of each counter for the given year
 *  - Extracts the x and y position of each counter
 *  - Determines the Neighborhood of each counter based on coordinates (calls determine neighborhood)
 *  - Extracts the name of the counter
 * 
 * Output : Returns a list containing all the information for each counter on the given year
 */



