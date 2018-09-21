module.exports = (grunt) => {
  grunt.initConfig({
    aws: grunt.file.readJSON('grunt-aws.json'),
    s3: {
      options: {
        key: '<%= aws.key %>',
        secret: '<%= aws.secret %>',
        bucket: '<%= aws.bucket %>',
        access: 'public-read',
        region: 'us-west-1',
      },
      dev: {
        // These options override the defaults
        // options: {
        //   // encodePaths: true,
        //   // maxOperations: 20
        // },
        // Files to be uploaded.
        upload: [
          {
            src: 'client/dist/bundle.js',
            dest: 'bundle.js',
          },
        ],
      },
    },
  });

  grunt.loadNpmTasks('grunt-s3');

  // grunt.registerTask('default', ['s3']);
};
