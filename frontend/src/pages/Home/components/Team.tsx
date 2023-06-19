const team = [
  {
    name: 'Zanyuan Yang',
    role: 'Full Stack Developer',
    imageUrl:
      'https://media.licdn.com/dms/image/D4E35AQGshc8VHhg9fQ/profile-framedphoto-shrink_400_400/0/1663098204432?e=1687726800&v=beta&t=Va2KEXMUj1jLDRqQqsabxFUzzeSW_k3vriVt0hfOPe0',
    linkedin: 'https://www.linkedin.com/in/zanyuan-yang-277562129/',
  },
  {
    name: 'Briante Sun',
    role: 'Sofeware Developer',
    imageUrl:
      'https://media.licdn.com/dms/image/D4D03AQGHYB-2IoruDw/profile-displayphoto-shrink_800_800/0/1680588237611?e=1692835200&v=beta&t=E8nrp-hDTGBSWzAw-XutS_utQguyGmRZcCTm1_b2h7s',
    linkedin: 'https://www.linkedin.com/in/briantesun/',
  },
  {
    name: 'Colin Steidtmann',
    role: 'Sofeware Developer',
    imageUrl:
      'https://media.licdn.com/dms/image/C5603AQHtSo5AYp2sDQ/profile-displayphoto-shrink_400_400/0/1629667896917?e=1692835200&v=beta&t=QPyPcWY31Rps2ETjj-fzOC5F_vimo0bn6p-BUmAjjbc',
    linkedin: 'https://www.linkedin.com/in/colinsteidtmann/',
  },
  {
    name: 'Sai Gopinath',
    role: 'Sofeware Developer',
    imageUrl:
      'https://media.licdn.com/dms/image/D4E35AQEoRLplgF8UGw/profile-framedphoto-shrink_400_400/0/1672530461151?e=1687726800&v=beta&t=w-kFn0AmpRVqNPlH5wJNP9fkFQzKYyvGPYv0CH2ujCM',
    linkedin: 'https://www.linkedin.com/in/sai-gopinath-3a1931170/',
  },
];

function Team() {
  return (
    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-48 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Our team
        </h2>
      </div>
      <ul
        role="list"
        className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
      >
        {team.map((person) => (
          <a href={person.linkedin} key={person.name}>
            <img
              className="mx-auto h-24 w-24 rounded-full"
              src={person.imageUrl}
              alt=""
            />
            <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
              {person.name}
            </h3>
            <p className="text-sm leading-6 text-gray-600">{person.role}</p>
          </a>
        ))}
      </ul>
    </div>
  );
}

export default Team;
