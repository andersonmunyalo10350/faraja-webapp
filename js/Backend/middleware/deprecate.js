function deprecate(req, res, next) {
  res.setHeader('Deprecation', 'true');
  res.setHeader('Sunset', 'Thu, 12 Nov 2026 20:59:59 GMT');
  res.setHeader(
    'Link',
    '</v2/memorials>; rel="successor-version"'
  );

  next();
}

module.exports = deprecate;
