FROM ruby:3.1.4-bullseye

WORKDIR /srv/jekyll

RUN gem install bundler -v 2.5.23

COPY Gemfile jekyll-theme-chirpy.gemspec ./
RUN bundle install

COPY . /srv/jekyll

EXPOSE 4000 35729

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--livereload", "--force_polling"]