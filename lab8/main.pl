fibb(X, Y, A, B) :- checkInRange(Y, A, B), Z is X + Y, X_NEW is Y, Y_NEW is Z, Y_NEW =< B, fibb(X_NEW, Y_NEW, A, B).
checkInRange(X, A, B) :- X_NEW is X, (A =< X, X =< B, write(X_NEW), write(" "), !; write("")).

program_1 :- write("Number 1: "),
     read(A), nl, 
     write("Number 2: "),
     read(B), nl,
     fibb(1, 1, A, B).
	 
	
round(X,Y,D) :- Z is X * 10^D, round(Z, ZA), Y is ZA / 10^D.

line(A, B) :- checkIsInt(A), A_NEW is A + 1, A_NEW =< B, line(A_NEW, B).
checkIsInt(X) :- X_NEW is X, (round(sqrt(X_NEW) - round(sqrt(X_NEW)), T_NEW, 2), T_NEW =:= 0,
				write(X_NEW), write(" "), !; write(" ")).

program_2 :- write("Number 1: "),
     read(A), nl, 
     write("Number 2: "),
     read(B), nl,
	 line(A, B).
	 

a.
writeNumber(X) :- X_NEW is X, write(X_NEW).
writecmp(S, A, B) :- A =:= B, nl, writeNumber(S).
writecmp(S, A, B) :- a.
another_line(A, B, C, S) :- (A mod C =:= 0, S_NEW is S + A, !; S_NEW is S),
							checkIsDiv(A, C), A_NEW is A + 1, writecmp(S_NEW, A, B), A_NEW =< B, another_line(A_NEW, B, C, S_NEW).
checkIsDiv(X, C) :- X_NEW is X, (X_NEW mod C =:= 0,	write(X_NEW), write(" "), !; write("")).
program_3 :- write("Number 1: "),
     read(A), nl, 
     write("Number 2: "),
     read(B), nl,
	 write("Number 3: "),
     read(C), nl,
	 another_line(A, B, C, 0).
