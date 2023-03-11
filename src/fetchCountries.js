export async function fetchCountries(name) {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name.official;capital;population;flags.svg;languages`
  );
  return response.json();
}
