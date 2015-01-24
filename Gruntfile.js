'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-responsive-images-extender');
  grunt.loadNpmTasks('grunt-shell');

  grunt.initConfig({
    shell: {
      jekyllBuild: {
        command: 'jekyll build'
      },
      jekyllWatch: {
        command: 'jekyll build -w'
      },
      deploy: {
        command: 'rsync -vrc --exclude=.DS_Store build/ smax:webapps/main/'
      }
    },
    responsive_images: {
      dev: {
        files: [{
          expand: true,
          src: ['images/**/*.{jpg,gif,png}'],
          cwd: 'src/',
          dest: 'build/'
        }],
        options: {
          newFilesOnly: false,
          quality: 80,
          sizes: [{
            name: 'small',
            width: 320
          },{
            name: 'medium',
            width: 640
          },{
            name: 'large',
            width: 800
          }]
        }
      }
    },
    responsive_images_extender: {
      dev: {
        files: [{
          expand: true,
          src: ['**/*.{html,htm,php}'],
          cwd: 'build/',
          dest: 'build/'
        }],
        options: {
          srcset: [{
            suffix: '-small',
            value: '320w'
          },{
            suffix: '-medium',
            value: '640w'
          },{
            suffix: '-large',
            value: '800w'
          }],
          sizes: [{
            selector: '.fig-hero img',
            sizeList: [{
              cond: 'min-width: 62.625em',
              size: '49.3125em'
            },{
              cond: 'min-width: 42.75em',
              size: '38.625em'
            },{
              cond: 'default',
              size: '100vw'
            }]
          },{
            selector: '.fig-image img',
            sizeList: [{
              cond: 'min-width: 42.75em',
              size: '38.625em'
            },{
              cond: 'default',
              size: '100vw'
            }]
          }]
        }
      }
    }
  });

  grunt.registerTask('watch', ['shell:jekyllWatch']);
  grunt.registerTask('deploy', ['shell:jekyllBuild', 'responsive_images', 'responsive_images_extender', 'shell:deploy']);
};
