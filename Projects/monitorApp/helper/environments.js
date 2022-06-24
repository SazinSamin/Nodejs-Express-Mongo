// dependencies

// App object - Module scafolding
const environments = {};

// environment for stating
environments.staging = {
    port: 3000,
    envName: 'Staging',
    hashKey : 'cekjncwe',
};

// environment for production
environments.production = {
    port: 5000,
    envName: 'Production',
    hashKey: 'efkuwecne',
};

// get the environment
const selectedEnvironment = typeof(process.env.ENV) === 'string' ? process.env.ENV 
                            : 'staging';
                        
// select export environment
const selectedExportEnv = typeof(environments[selectedEnvironment]) === 'object' ?
                        environments[selectedEnvironment] : environments.staging;
    
// export the module
module.exports = selectedExportEnv;

