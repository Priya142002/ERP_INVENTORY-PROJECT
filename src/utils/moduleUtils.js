import { erpModules } from '../config/modules';

export function getCurrentModuleInfo(pathname) {
  const module = erpModules.find((m) => {
    if (pathname === m.path) return true;
    if (m.subMenu) return m.subMenu.some((s) => pathname.startsWith(s.path));
    return false;
  });

  if (!module) return { name: 'Unknown', subName: '' };

  const sub = module.subMenu?.find((s) => pathname.startsWith(s.path));

  return {
    name: module.name,
    subName: sub?.name || ''
  };
}
