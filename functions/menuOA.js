exports.menuOA = (v) => {
    return `
╭─⊷❲ *DATABASE* ❳
◨ ${v}addimg <text>
◨ ${v}addvid <text>
◨ ${v}addstik <text>
◨ ${v}getimg <text>
◨ ${v}getvid <text>
◨ ${v}getstik <text>
◨ ${v}listmedia
╰────────
╭─⊷❲ *ABSENSI* ❳
◨ ${v}absenstart
◨ ${v}delabsen
◨ ${v}cekabsen
◨ ${v}absen
◨ ${v}izin
╰────────
╭─⊷❲ *VOTING* ❳
◨ ${v}voting <text>
◨ ${v}delvote
◨ ${v}cekvote
◨ ${v}vote
◨ ${v}devote
╰────────
╭─⊷❲ *ADMIN* ❳
◨ ${v}open
◨ ${v}close
◨ ${v}link
◨ ${v}revoke
◨ ${v}online
◨ ${v}offline
◨ ${v}hidetag
◨ ${v}setppgc
◨ ${v}setname <text>
◨ ${v}setdesk <text>
◨ ${v}profile @tag
◨ ${v}infogroup
◨ ${v}add <nomor>
◨ ${v}kick @taguser
◨ ${v}promote @taguser
◨ ${v}demote @taguser
◨ ${v}warn @taguser
◨ ${v}delwarn @taguser
◨ ${v}cekwarn @taguser
◨ ${v}setwelcome <text>
◨ ${v}setbye <text>
◨ ${v}delwelcome
◨ ${v}delbye
◨ ${v}simulasi welcome
◨ ${v}simulasi bye
╰────────
╭─⊷❲ *GROUP* ❳
◨ ${v}welcome on
◨ ${v}welcome off
◨ ${v}antidelete on
◨ ${v}antidelete off
◨ ${v}detect on
◨ ${v}detect off
◨ ${v}antilink on
◨ ${v}antilink off
◨ ${v}antiviewonce on
◨ ${v}antiviewonce off
◨ ${v}addpremium @taguser
◨ ${v}delpremium @taguser
◨ ${v}banned @taguser
◨ ${v}unbanned @taguser
╰────────
╭─⊷❲ *OWNER* ❳
◨ ${v}join <link>
◨ ${v}grouplist
◨ ${v}upsw
◨ ${v}setppbot
◨ ${v}setthumb
◨ ${v}setfakethumb
◨ ${v}onepref
◨ ${v}nopref
◨ ${v}multi
◨ ${v}inspect <link>
◨ ${v}listreport
╰────────`;
};